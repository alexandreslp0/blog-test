import { IsDefined, IsString, MinLength } from 'class-validator';

export class CreateArticleRequest {
  @IsDefined()
  @IsString()
  @MinLength(1)
  title: string;

  @IsDefined()
  @IsString()
  @MinLength(3)
  content: string;
}
