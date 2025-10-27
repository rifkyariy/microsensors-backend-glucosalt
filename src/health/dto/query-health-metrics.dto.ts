import { IsOptional, IsString } from 'class-validator';

export class QueryHealthMetricsDto {
  @IsOptional()
  @IsString()
  start?: string; // e.g., '-7d', '-24h'

  @IsOptional()
  @IsString()
  end?: string;

  @IsOptional()
  @IsString()
  interval?: string; // e.g., '1h', '5m'
}
