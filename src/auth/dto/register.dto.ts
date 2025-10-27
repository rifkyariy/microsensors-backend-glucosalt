import { IsEmail, IsString, MinLength, IsOptional, IsNumber, IsIn, Min, Max } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

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
  height?: number;
}
