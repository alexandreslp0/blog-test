import { Role } from 'src/modules/roles/domains/role.entity';

export interface TokenPayload {
  userId: string;
  email: string;
  role: Role;
}

export interface TokenService {
  generateToken(payload: TokenPayload): string;
  verifyToken(token: string): TokenPayload;
  decodeToken(token: string): TokenPayload | null;
}
