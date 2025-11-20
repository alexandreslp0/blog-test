import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { TypeOrmRoleEntity } from './role.entity';
import { PermissionAction, PermissionSubject } from 'src/modules/permissions/domain/enums';

@Entity('permissions')
export class TypeOrmPermissionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: PermissionAction })
  action: PermissionAction;

  @Column({ type: 'enum', enum: PermissionSubject })
  subject: PermissionSubject;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => TypeOrmRoleEntity)
  @JoinTable({
    name: 'role_permissions',
    joinColumn: { name: 'permission_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  role: TypeOrmRoleEntity[];
}
