import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/modules/users/domain/user.repository';
import { Repository } from 'typeorm';
import { TypeOrmUserEntity } from '../entities/user.entity';
import { TypeOrmRoleEntity } from '../entities/role.entity';
import { User } from 'src/modules/users/domain/user.entity';
import { Role } from 'src/modules/roles/domains/role.entity';

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(TypeOrmUserEntity)
    private readonly ormRepository: Repository<TypeOrmUserEntity>,
  ) {}

  async findAll(): Promise<User[]> {
    const entities = await this.ormRepository.find({
      relations: { role: true },
    });

    return entities
      .map((entity) => {
        const role = entity.role ? this.roleToDomain(entity.role) : null;
        return role ? this.toDomain(entity, role) : null;
      })
      .filter((user): user is User => user !== null);
  }

  async findById(id: string): Promise<User | null> {
    const userEntity = await this.ormRepository.findOne({
      where: { id },
      relations: { role: true },
    });

    const role = userEntity ? this.roleToDomain(userEntity.role) : null;

    return role && userEntity ? this.toDomain(userEntity, role) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const userEntity = await this.ormRepository.findOne({
      where: { email },
      relations: { role: true },
    });

    const role = userEntity ? this.roleToDomain(userEntity.role) : null;

    return role && userEntity ? this.toDomain(userEntity, role) : null;
  }

  async save(user: User): Promise<User> {
    const userEntity = this.toPersistence(user);
    const savedUserEntity = await this.ormRepository.save(userEntity);
    return this.toDomain(savedUserEntity, userEntity.role);
  }

  async delete(user: User): Promise<void> {
    await this.ormRepository.delete(user.id);
  }

  private toDomain(entity: TypeOrmUserEntity, role: Role): User {
    return new User(entity.id, entity.name, entity.email, entity.password, role, entity.createdAt, entity.updatedAt);
  }

  private toPersistence(user: User): TypeOrmUserEntity {
    const entity = new TypeOrmUserEntity();
    entity.id = user.id;
    entity.name = user.name;
    entity.email = user.email;
    entity.password = user['password'];
    entity.roleId = user.role.id;
    return entity;
  }

  private roleToDomain(roleEntity: TypeOrmRoleEntity): Role {
    return new Role(roleEntity.id, roleEntity.name, roleEntity.slug, roleEntity.createdAt, roleEntity.updatedAt);
  }
}
