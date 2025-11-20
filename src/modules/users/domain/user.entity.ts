import { Role } from 'src/modules/roles/domains/role.entity';

export class User {
  constructor(
    public readonly id: string,
    public name: string,
    public email: string,
    private password: string,
    public role: Role,
    public readonly createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}
}
