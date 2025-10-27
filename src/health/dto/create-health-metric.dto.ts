import { IsString, IsNumber, Min, Max, IsOptional, IsDateString, IsArray } from 'class-validator';

export class CreateHealthMetricDto {
  @IsString()
  device_id: string;

  @IsString()
  user_id: string;

  @IsNumber()
  @Min(0)
  @Max(300)
  heart_rate: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  blood_oxygen: number;

  @IsOptional()
  @IsDateString()
  timestamp?: string;

  // Accept the legacy/device field name "recorded_at" (optional).
  @IsOptional()
  @IsDateString()
  recorded_at?: string;

  // PPG (Photoplethysmogram) raw data arrays for analytics
  @IsOptional()
  @IsArray()
  ppg_ir?: number[];

  @IsOptional()
  @IsArray()
  ppg_red?: number[];
}