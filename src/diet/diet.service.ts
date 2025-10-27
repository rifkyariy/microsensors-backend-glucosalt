import { Injectable, Logger } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateDietDto } from './dto/create-diet.dto';
import { QueryDietDto } from './dto/query-diet.dto';

@Injectable()
export class DietService {
  private readonly logger = new Logger(DietService.name);

  constructor(private supabaseService: SupabaseService) {}

  /**
   * Log a diet record
   */
  async create(createDietDto: CreateDietDto) {
    try {
      // Try to find food in database first
      let nutritionInfo = {
        calories: createDietDto.calories,
        carbs: createDietDto.carbs || 0,
        protein: createDietDto.protein || 0,
        fat: createDietDto.fat || 0,
      };

      const admin: any = this.supabaseService.getAdminClient();
      const foodRes: any = await admin.from('food_database').select('*').ilike('name', `%${createDietDto.food_name}%`).limit(1).single();
      const foodData = foodRes.data;

      // If food found in database and no custom nutrition provided, use database values
      if (foodData && !createDietDto.calories) {
        nutritionInfo = {
          calories: (foodData.calories as number) || 0,
          carbs: (foodData.carbs as number) || 0,
          protein: (foodData.protein as number) || 0,
          fat: (foodData.fat as number) || 0,
        };
      }

      const dietRecord: any = {
        user_id: createDietDto.user_id,
        meal_type: createDietDto.meal_type,
        food_name: createDietDto.food_name,
        ...nutritionInfo,
        recorded_at: createDietDto.recorded_at || new Date().toISOString(),
      };

      const insertRes: any = await admin.from('diet_records').insert(dietRecord as any).select().single();
      const { data, error } = insertRes;
      if (error) throw error;

      return {
        success: true,
        message: 'Diet record created successfully',
        data,
      };
    } catch (error) {
      this.logger.error('Failed to create diet record', error);
      throw error;
    }
  }

  /**
   * Get diet records for a user
   */
  async findByUser(userId: string, query: QueryDietDto) {
    try {
      let dbQuery = this.supabaseService
        .getAdminClient()
        .from('diet_records')
        .select('*')
        .eq('user_id', userId)
        .order('recorded_at', { ascending: false });

      // Filter by date if provided
      if (query.date) {
        const startOfDay = `${query.date}T00:00:00Z`;
        const endOfDay = `${query.date}T23:59:59Z`;
        dbQuery = dbQuery.gte('recorded_at', startOfDay).lte('recorded_at', endOfDay);
      }

      // Filter by meal type if provided
      if (query.meal_type) {
        dbQuery = dbQuery.eq('meal_type', query.meal_type);
      }

      const { data, error } = await dbQuery;

      if (error) throw error;

      // Calculate totals
      const totals = this.calculateTotals(data || []);

      return {
        success: true,
        data,
        totals,
        count: data?.length || 0,
      };
    } catch (error) {
      this.logger.error('Failed to fetch diet records', error);
      throw error;
    }
  }

  /**
   * Get daily summary
   */
  async getDailySummary(userId: string, date?: string) {
    const targetDate = date || new Date().toISOString().split('T')[0];
    
    try {
      const result = await this.findByUser(userId, { date: targetDate });

      // Group by meal type
      const mealGroups: any = {
        breakfast: [],
        lunch: [],
        dinner: [],
        snack: [],
      };

      (result.data || []).forEach((record: any) => {
        if (mealGroups[record.meal_type]) {
          mealGroups[record.meal_type].push(record);
        }
      });

      return {
        success: true,
        date: targetDate,
        meals: mealGroups,
        totals: result.totals,
      };
    } catch (error) {
      this.logger.error('Failed to get daily summary', error);
      throw error;
    }
  }

  /**
   * Search food database
   */
  async searchFood(query: string) {
    try {
      const { data, error } = await this.supabaseService
        .getAdminClient()
        .from('food_database')
        .select('*')
        .ilike('name', `%${query}%`)
        .limit(20);

      if (error) throw error;

      return {
        success: true,
        data,
        count: data?.length || 0,
      };
    } catch (error) {
      this.logger.error('Failed to search food database', error);
      throw error;
    }
  }

  /**
   * Calculate nutrition totals
   */
  private calculateTotals(records: any[]) {
    return records.reduce(
      (totals, record) => ({
        calories: totals.calories + (record.calories || 0),
        carbs: totals.carbs + (record.carbs || 0),
        protein: totals.protein + (record.protein || 0),
        fat: totals.fat + (record.fat || 0),
      }),
      { calories: 0, carbs: 0, protein: 0, fat: 0 },
    );
  }
}
