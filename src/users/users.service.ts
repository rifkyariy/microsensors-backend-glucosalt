import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private supabaseService: SupabaseService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      // supabase-js types can be strict here; cast to any to avoid 'never' errors
      const admin: any = this.supabaseService.getAdminClient();
      const createRes: any = await admin.from('users').insert(createUserDto as any).select().single();
      const { data, error } = createRes;

      if (error) throw error;

      return {
        success: true,
        message: 'User created successfully',
        data,
      };
    } catch (error) {
      this.logger.error('Failed to create user', error);
      throw error;
    }
  }

  async findAll() {
    try {
      const { data, error } = await this.supabaseService
        .getAdminClient()
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return {
        success: true,
        data,
        count: data?.length || 0,
      };
    } catch (error) {
      this.logger.error('Failed to fetch users', error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const { data, error } = await this.supabaseService
        .getAdminClient()
        .from('users')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (!data) throw new NotFoundException(`User with ID ${id} not found`);

      return {
        success: true,
        data,
      };
    } catch (error) {
      this.logger.error('Failed to fetch user', error);
      throw error;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const admin2: any = this.supabaseService.getAdminClient();
      const updateRes: any = await admin2.from('users').update(updateUserDto as any).eq('id', id).select().single();
      const { data, error } = updateRes;

      if (error) throw error;
      if (!data) throw new NotFoundException(`User with ID ${id} not found`);

      return {
        success: true,
        message: 'User updated successfully',
        data,
      };
    } catch (error) {
      this.logger.error('Failed to update user', error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const { error } = await this.supabaseService
        .getAdminClient()
        .from('users')
        .delete()
        .eq('id', id);

      if (error) throw error;

      return {
        success: true,
        message: 'User deleted successfully',
      };
    } catch (error) {
      this.logger.error('Failed to delete user', error);
      throw error;
    }
  }
}
