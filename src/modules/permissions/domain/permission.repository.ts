import { Permission } from './permission.entity';

export interface PermissionRepository {
  findByRoleId(roleId: string): Promise<Permission[]>;
}
