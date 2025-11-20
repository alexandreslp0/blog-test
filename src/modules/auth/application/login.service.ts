import { Injectable, Inject } from '@nestjs/common';
import type { UserRepository } from 'src/modules/users/domain/user.repository';
import type { HashService } from '../domain/hash.service.interface';
import type { TokenService } from '../domain/token.service.interface';
import { LoginRequest } from './dtos/login.request';
import { LoginResponse } from './dtos/login.response';

@Injectable()
export class LoginService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    @Inject('HashService')
    private readonly hashService: HashService,
    @Inject('TokenService')
    private readonly tokenService: TokenService,
  ) {}

  async execute(request: LoginRequest): Promise<LoginResponse> {
    const { email, password } = request;

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await this.hashService.compare(password, user['password']);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const tokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = this.tokenService.generateToken(tokenPayload);

    return new LoginResponse(accessToken);
  }
}
