import { PermissionAction, PermissionSubject } from './enums';

export class Permission {
  constructor(
    public readonly id: string,
    public readonly action: PermissionAction,
    public readonly subject: PermissionSubject,
    public readonly createdAt: Date = new Date(),
    public readonly updatedAt: Date = new Date(),
  ) {}
}
