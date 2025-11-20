import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { HashService } from 'src/modules/auth/domain/hash.service.interface';

@Injectable()
export class BcryptHashService implements HashService {
  private readonly SALT_ROUNDS = 12;

  async hash(password: string): Promise<string> {
    const hashed = await hash(password, this.SALT_ROUNDS);
    return hashed;
  }

  async compare(password: string, hash: string): Promise<boolean> {
    if (!password || !hash) {
      return false;
    }

    const isValid = await compare(password, hash);
    return isValid;
  }
}
