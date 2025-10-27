import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateBmiDto } from './dto/create-bmi.dto';

@Injectable()
export class BmiService {
  private readonly logger = new Logger(BmiService.name);

  constructor(private supabaseService: SupabaseService) {}

  /**
   * Calculate BMI and store record
   */
  async create(createBmiDto: CreateBmiDto) {
    try {
      // Fetch user's height
      const admin: any = this.supabaseService.getAdminClient();
      const userRes: any = await admin.from('users').select('height').eq('id', createBmiDto.user_id).single();

      const user = userRes.data;
      const userError = userRes.error;

      if (userError) throw userError;
      if (!user) {
        throw new NotFoundException('User not found.');
      }

      // Coerce and validate height (Supabase DECIMAL may come back as string)
      const heightVal = typeof user.height === 'string' ? parseFloat(user.height) : Number(user.height);
      if (!heightVal || Number.isNaN(heightVal) || heightVal <= 0) {
        throw new NotFoundException('User height not found or invalid. Please update user profile first.');
      }

      // Calculate BMI = weight / (height^2)
      const bmi = createBmiDto.weight / (heightVal * heightVal);

      // Store BMI record
      const bmiRecord: any = {
        user_id: createBmiDto.user_id,
        weight: createBmiDto.weight,
        bmi: parseFloat(bmi.toFixed(2)),
        recorded_at: createBmiDto.recorded_at || new Date().toISOString(),
      };

      const insertRes: any = await admin.from('bmi_records').insert(bmiRecord as any).select().single();
      const { data, error } = insertRes;
      if (error) throw error;

      return {
        success: true,
        message: 'BMI record created successfully',
        data: {
          // Ensure returned bmi is a number (Supabase may return strings for DECIMAL)
          ...data,
          bmi: typeof data.bmi === 'string' ? parseFloat(data.bmi) : Number(data.bmi),
          category: this.getBmiCategory(bmi),
        },
      };
    } catch (error) {
      this.logger.error('Failed to create BMI record', error);
      throw error;
    }
  }

  /**
   * Get BMI history for a user
   */
  async findByUser(userId: string, limit = 30) {
    try {
      const admin2: any = this.supabaseService.getAdminClient();
      const listRes: any = await admin2.from('bmi_records').select('*').eq('user_id', userId).order('recorded_at', { ascending: false }).limit(limit);
      const { data, error } = listRes;

      if (error) throw error;

      // Coerce all BMI and weight values to numbers
      const records = (data || []).map((record: any) => ({
        ...record,
        bmi: typeof record.bmi === 'string' ? parseFloat(record.bmi) : Number(record.bmi),
        weight: typeof record.weight === 'string' ? parseFloat(record.weight) : Number(record.weight),
        category: this.getBmiCategory(typeof record.bmi === 'string' ? parseFloat(record.bmi) : Number(record.bmi)),
      }));

      // Calculate statistics
      const stats = this.calculateStats(records);

      return {
        success: true,
        data: records,
        stats,
        count: records.length,
      };
    } catch (error) {
      this.logger.error('Failed to fetch BMI records', error);
      throw error;
    }
  }

  /**
   * Get latest BMI for a user
   */
  async getLatest(userId: string) {
    try {
      const admin2: any = this.supabaseService.getAdminClient();
      const latestRes: any = await admin2.from('bmi_records').select('*').eq('user_id', userId).order('recorded_at', { ascending: false }).limit(1).single();
      const data = latestRes.data;
      const error = latestRes.error;

      if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows
      if (!data) {
        return {
          success: true,
          data: null,
          message: 'No BMI records found',
        };
      }

      // Ensure numeric types (Supabase DECIMAL may return strings)
      const bmiValue = typeof data.bmi === 'string' ? parseFloat(data.bmi) : Number(data.bmi);
      const weightValue = typeof data.weight === 'string' ? parseFloat(data.weight) : Number(data.weight);

      return {
        success: true,
        data: {
          ...data,
          bmi: bmiValue,
          weight: weightValue,
          category: this.getBmiCategory(bmiValue),
        },
      };
    } catch (error) {
      this.logger.error('Failed to fetch latest BMI', error);
      throw error;
    }
  }

  /**
   * Sync/Reset all BMI records based on current user height
   * Recalculates BMI for all existing records using user's current height
   */
  async syncBmiRecords(userId: string) {
    try {
      const admin: any = this.supabaseService.getAdminClient();

      // 1. Fetch user's current height
      const userRes: any = await admin.from('users').select('height, age, gender, email').eq('id', userId).single();
      const user = userRes.data;
      const userError = userRes.error;

      if (userError) throw userError;
      if (!user) {
        throw new NotFoundException('User not found.');
      }

      // Parse and validate height
      const heightVal = typeof user.height === 'string' ? parseFloat(user.height) : Number(user.height);
      if (!heightVal || Number.isNaN(heightVal) || heightVal <= 0) {
        throw new NotFoundException('User height not found or invalid. Please update user profile first.');
      }

      // 2. Fetch all BMI records for this user
      const recordsRes: any = await admin.from('bmi_records').select('*').eq('user_id', userId).order('recorded_at', { ascending: true });
      const { data: records, error: recordsError } = recordsRes;

      if (recordsError) throw recordsError;

      if (!records || records.length === 0) {
        return {
          success: true,
          message: 'No BMI records to sync',
          user: {
            id: userId,
            email: user.email,
            height: heightVal,
            age: user.age,
            gender: user.gender,
          },
          recordsUpdated: 0,
        };
      }

      // 3. Recalculate BMI for each record using current height
      const updatedRecords: Array<{
        id: string;
        weight: number;
        oldBmi: number;
        newBmi: number;
        recorded_at: string;
      }> = [];
      for (const record of records) {
        const weight = typeof record.weight === 'string' ? parseFloat(record.weight) : Number(record.weight);
        const newBmi = weight / (heightVal * heightVal);
        const roundedBmi = parseFloat(newBmi.toFixed(2));

        // Update the record
        const updateRes: any = await admin
          .from('bmi_records')
          .update({ bmi: roundedBmi })
          .eq('id', record.id)
          .select()
          .single();

        if (updateRes.error) {
          this.logger.error(`Failed to update BMI record ${record.id}`, updateRes.error);
          continue;
        }

        updatedRecords.push({
          id: record.id,
          weight,
          oldBmi: typeof record.bmi === 'string' ? parseFloat(record.bmi) : Number(record.bmi),
          newBmi: roundedBmi,
          recorded_at: record.recorded_at,
        });
      }

      return {
        success: true,
        message: `Successfully synced ${updatedRecords.length} BMI records`,
        user: {
          id: userId,
          email: user.email,
          height: heightVal,
          age: user.age,
          gender: user.gender,
        },
        recordsUpdated: updatedRecords.length,
        records: updatedRecords,
      };
    } catch (error) {
      this.logger.error('Failed to sync BMI records', error);
      throw error;
    }
  }

  /**
   * Determine BMI category
   */
  private getBmiCategory(bmi: number): string {
    if (bmi < 18.5) return 'Underweight';
    if (bmi >= 18.5 && bmi < 25) return 'Normal weight';
    if (bmi >= 25 && bmi < 30) return 'Overweight';
    return 'Obese';
  }

  /**
   * Calculate statistics
   */
  private calculateStats(records: any[]) {
    if (records.length === 0) {
      return { average: 0, trend: 'stable', min: 0, max: 0 };
    }

    const bmiValues = records.map((r: any) => r.bmi);
    const average = bmiValues.reduce((a: number, b: number) => a + b, 0) / bmiValues.length;
    const min = Math.min(...bmiValues);
    const max = Math.max(...bmiValues);

    // Calculate trend (compare last 3 vs previous 3)
    let trend = 'stable';
    if (records.length >= 6) {
      const recent = records.slice(0, 3).reduce((sum: number, r: any) => sum + r.bmi, 0) / 3;
      const previous = records.slice(3, 6).reduce((sum: number, r: any) => sum + r.bmi, 0) / 3;
      
      if (recent > previous + 0.5) trend = 'increasing';
      else if (recent < previous - 0.5) trend = 'decreasing';
    }

    return {
      average: parseFloat(average.toFixed(2)),
      min: parseFloat(min.toFixed(2)),
      max: parseFloat(max.toFixed(2)),
      trend,
    };
  }
}
