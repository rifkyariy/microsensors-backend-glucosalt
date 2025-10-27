import { IsOptional, IsString } from 'class-validator';

export class QueryDietDto {
  @IsOptional()
  @IsString()
  date?: string; // YYYY-MM-DD format

  @IsOptional()
  @IsString()
  meal_type?: string;
}
