import { IsString, IsEmail, IsNumber, IsOptional, Min, Max, IsIn } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(150)
  age?: number;

  @IsOptional()
  @IsString()
  @IsIn(['male', 'female', 'other'])
  gender?: string;

  @IsOptional()
  @IsNumber()
  @Min(0.5)
  @Max(3.0)
  height?: number; // in meters
}
