import { Injectable, CanActivate, ExecutionContext, ForbiddenException, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { PermissionRepository } from 'src/modules/permissions/domain/permission.repository';
import { Request } from 'express';
import { TokenPayload } from '../domain/token.service.interface';
import { PermissionAction, PermissionSubject } from 'src/modules/permissions/domain/enums';

export interface RequiredPermission {
  subject: PermissionSubject;
  action: PermissionAction;
}

export const PERMISSIONS_KEY = 'permissions';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject('PermissionRepository')
    private readonly permissionRepository: PermissionRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.get<RequiredPermission[]>(PERMISSIONS_KEY, context.getHandler());

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as TokenPayload;

    if (!user || !user.role) {
      throw new ForbiddenException('User not authenticated or missing role');
    }

    const userPermissions = await this.permissionRepository.findByRoleId(user.role.id);

    const hasPermission = requiredPermissions.some((required) =>
      userPermissions.some((userPerm) => userPerm.subject === required.subject && userPerm.action === required.action),
    );

    if (!hasPermission) {
      const requiredActions = requiredPermissions.map((p) => `${p.action}:${p.subject}`).join(', ');
      throw new ForbiddenException(`Insufficient permissions. Required: ${requiredActions}`);
    }

    return true;
  }
}
