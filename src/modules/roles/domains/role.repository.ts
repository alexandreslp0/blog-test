import { Role } from './role.entity';

export interface RoleRepository {
  findBySlug(slug: string): Promise<Role | null>;
}
