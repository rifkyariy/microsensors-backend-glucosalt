import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          age: number;
          gender: string;
          height: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['users']['Insert']>;
      };
      bmi_records: {
        Row: {
          id: string;
          user_id: string;
          weight: number;
          bmi: number;
          recorded_at: string;
        };
        Insert: Omit<Database['public']['Tables']['bmi_records']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['bmi_records']['Insert']>;
      };
      diet_records: {
        Row: {
          id: string;
          user_id: string;
          meal_type: string;
          food_name: string;
          calories: number;
          carbs: number;
          protein: number;
          fat: number;
          recorded_at: string;
        };
        Insert: Omit<Database['public']['Tables']['diet_records']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['diet_records']['Insert']>;
      };
      food_database: {
        Row: {
          id: string;
          name: string;
          calories: number;
          carbs: number;
          protein: number;
          fat: number;
          serving_size: string;
        };
        Insert: Omit<Database['public']['Tables']['food_database']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['food_database']['Insert']>;
      };
    };
  };
}

@Injectable()
export class SupabaseService {
  private readonly logger = new Logger(SupabaseService.name);
  private supabase: SupabaseClient<Database>;
  private supabaseAdmin: SupabaseClient<Database>;

  constructor(private configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL') || '';
    const supabaseAnonKey = this.configService.get<string>('SUPABASE_ANON_KEY') || '';
    const supabaseServiceKey = this.configService.get<string>('SUPABASE_SERVICE_KEY') || '';

    // Client for user-level operations
    this.supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

    // Admin client for backend operations (bypasses RLS)
    this.supabaseAdmin = createClient<Database>(supabaseUrl, supabaseServiceKey);

    this.logger.log('Supabase service initialized');
  }

  /**
   * Get the Supabase client (respects RLS)
   */
  getClient(): SupabaseClient<Database> {
    return this.supabase;
  }

  /**
   * Get the Supabase admin client (bypasses RLS)
   */
  getAdminClient(): SupabaseClient<Database> {
    return this.supabaseAdmin;
  }

  /**
   * Verify JWT token and get user
   */
  async verifyToken(token: string) {
    try {
      const { data, error } = await this.supabase.auth.getUser(token);
      if (error) throw error;
      return data.user;
    } catch (error) {
      this.logger.error('Error verifying token', error);
      throw error;
    }
  }
}
