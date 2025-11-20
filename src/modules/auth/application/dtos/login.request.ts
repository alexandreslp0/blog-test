import { IsDefined, IsString } from 'class-validator';

export class LoginRequest {
  @IsDefined()
  @IsString()
  email: string;

  @IsDefined()
  @IsString()
  password: string;
}
