import { User } from '../../domain/user.entity';

export class UserResponse {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly role: string,
    public readonly createdAt: Date,
  ) {}

  static fromDomain(user: User): UserResponse {
    return new UserResponse(user.id, user.name, user.email, user.role.name, user.createdAt);
  }
}
