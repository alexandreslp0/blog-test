import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TypeOrmRoleEntity } from './role.entity';

@Entity('users')
export class TypeOrmUserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => TypeOrmRoleEntity)
  @JoinColumn({ name: 'role_id' })
  role: TypeOrmRoleEntity;

  @Column({ name: 'role_id' })
  roleId: string;
}
