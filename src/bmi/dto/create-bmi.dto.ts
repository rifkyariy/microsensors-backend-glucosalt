import { IsString, IsNumber, Min, IsOptional } from 'class-validator';

export class CreateBmiDto {
  @IsString()
  user_id: string;

  @IsNumber()
  @Min(20)
  weight: number; // in kg

  @IsOptional()
  @IsString()
  recorded_at?: string;
}
