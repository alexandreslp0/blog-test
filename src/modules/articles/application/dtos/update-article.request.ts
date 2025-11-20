import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateArticleRequest {
  @IsOptional()
  @IsString()
  @MinLength(1)
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  content?: string;
}
