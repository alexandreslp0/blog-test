import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/modules/permissions/domain/permission.entity';
import { PermissionRepository } from 'src/modules/permissions/domain/permission.repository';
import { Repository } from 'typeorm';
import { TypeOrmPermissionEntity } from '../entities/permission.entity';

@Injectable()
export class TypeOrmPermissionRepository implements PermissionRepository {
  constructor(
    @InjectRepository(TypeOrmPermissionEntity)
    private readonly ormRepository: Repository<TypeOrmPermissionEntity>,
  ) {}

  async findByRoleId(roleId: string): Promise<Permission[]> {
    const permissionEntities = await this.ormRepository.find({
      where: { role: { id: roleId } },
    });

    return permissionEntities.map((entity) => this.toDomain(entity));
  }

  private toDomain(entity: TypeOrmPermissionEntity): Permission {
    return new Permission(entity.id, entity.action, entity.subject, entity.createdAt, entity.updatedAt);
  }
}
