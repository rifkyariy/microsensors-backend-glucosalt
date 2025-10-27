import { IsString, IsNumber, Min, IsOptional, IsIn } from 'class-validator';

export class CreateDietDto {
  @IsString()
  user_id: string;

  @IsString()
  food_name: string;

  @IsString()
  @IsIn(['breakfast', 'lunch', 'dinner', 'snack'])
  meal_type: string;

  @IsNumber()
  @Min(0)
  calories: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  carbs?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  protein?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  fat?: number;

  @IsOptional()
  @IsString()
  recorded_at?: string;
}
