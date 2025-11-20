import { IsString, MinLength, IsOptional } from 'class-validator';

export class UpdateUserRequest {
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  role?: string;
}
