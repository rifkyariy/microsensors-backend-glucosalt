import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfluxdbModule } from './influxdb/influxdb.module';
import { SupabaseModule } from './supabase/supabase.module';
import { HealthModule } from './health/health.module';
import { UsersModule } from './users/users.module';
import { BmiModule } from './bmi/bmi.module';
import { DietModule } from './diet/diet.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    InfluxdbModule,
    SupabaseModule,
    AuthModule,
    HealthModule,
    UsersModule,
    BmiModule,
    DietModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
