import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private supabaseService: SupabaseService) {}

  async register(registerDto: RegisterDto) {
    try {
      const client: any = this.supabaseService.getClient();

      // Create auth user
      const { data: authData, error: authError } = await client.auth.signUp({
        email: registerDto.email,
        password: registerDto.password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('User creation failed');

      // Create user profile in users table
      const admin: any = this.supabaseService.getAdminClient();
      const { data: userData, error: userError } = await admin
        .from('users')
        .insert({
          id: authData.user.id,
          email: registerDto.email,
          name: registerDto.name,
          age: registerDto.age,
          gender: registerDto.gender,
          height: registerDto.height,
        })
        .select()
        .single();

      if (userError) {
        this.logger.error('Failed to create user profile', userError);
        // Optionally: clean up auth user if profile creation fails
      }

      return {
        success: true,
        message: 'User registered successfully',
        data: {
          user: authData.user,
          session: authData.session,
        },
      };
    } catch (error) {
      this.logger.error('Registration failed', error);
      throw error;
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const client: any = this.supabaseService.getClient();

      const { data, error } = await client.auth.signInWithPassword({
        email: loginDto.email,
        password: loginDto.password,
      });

      if (error) throw new UnauthorizedException('Invalid credentials');
      if (!data.session) throw new UnauthorizedException('Login failed');

      return {
        success: true,
        message: 'Login successful',
        data: {
          user: data.user,
          session: data.session,
          access_token: data.session.access_token,
        },
      };
    } catch (error) {
      this.logger.error('Login failed', error);
      throw error;
    }
  }

  async verifyToken(token: string) {
    try {
      const user = await this.supabaseService.verifyToken(token);
      return { success: true, user };
    } catch (error) {
      this.logger.error('Token verification failed', error);
      throw new UnauthorizedException('Invalid token');
    }
  }

  async logout(token: string) {
    try {
      const client: any = this.supabaseService.getClient();
      const { error } = await client.auth.signOut();
      if (error) throw error;

      return {
        success: true,
        message: 'Logout successful',
      };
    } catch (error) {
      this.logger.error('Logout failed', error);
      throw error;
    }
  }
}
