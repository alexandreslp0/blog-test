import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload, TokenService } from 'src/modules/auth/domain/token.service.interface';

@Injectable()
export class JwtTokenService implements TokenService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(payload: TokenPayload): string {
    return this.jwtService.sign(payload);
  }

  verifyToken(token: string): TokenPayload {
    return this.jwtService.verify(token);
  }

  decodeToken(token: string): TokenPayload | null {
    try {
      return this.jwtService.decode(token);
    } catch {
      return null;
    }
  }
}
