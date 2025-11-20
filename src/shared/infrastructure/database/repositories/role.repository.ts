import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleRepository } from 'src/modules/roles/domains/role.repository';
import { TypeOrmRoleEntity } from '../entities/role.entity';
import { Role } from 'src/modules/roles/domains/role.entity';

@Injectable()
export class TypeOrmRoleRepository implements RoleRepository {
  constructor(
    @InjectRepository(TypeOrmRoleEntity)
    private readonly ormRepository: Repository<TypeOrmRoleEntity>,
  ) {}

  async findBySlug(slug: string): Promise<Role | null> {
    const role = await this.ormRepository.findOne({
      where: { slug },
    });

    return role ? this.toDomain(role) : null;
  }

  private toDomain(entity: TypeOrmRoleEntity): Role {
    return new Role(entity.id, entity.slug, entity.description, entity.createdAt, entity.updatedAt);
  }
}
