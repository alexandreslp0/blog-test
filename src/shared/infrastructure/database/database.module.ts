import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TypeOrmUserEntity } from './entities/user.entity';
import { TypeOrmPermissionEntity } from './entities/permission.entity';
import { TypeOrmRoleEntity } from './entities/role.entity';

import { TypeOrmUserRepository } from './repositories/user.repository';
import { TypeOrmPermissionRepository } from './repositories/permission.repository';
import { TypeOrmRoleRepository } from './repositories/role.repository';
import { TypeOrmArticleRepository } from './repositories/article.repository';
import { TypeOrmArticleEntity } from './entities/article.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get<TypeOrmModuleOptions>('typeorm-config'),
      }),
    }),

    TypeOrmModule.forFeature([TypeOrmUserEntity, TypeOrmPermissionEntity, TypeOrmRoleEntity, TypeOrmArticleEntity]),
  ],
  providers: [
    {
      provide: 'UserRepository',
      useClass: TypeOrmUserRepository,
    },
    {
      provide: 'PermissionRepository',
      useClass: TypeOrmPermissionRepository,
    },
    {
      provide: 'RoleRepository',
      useClass: TypeOrmRoleRepository,
    },
    {
      provide: 'ArticleRepository',
      useClass: TypeOrmArticleRepository,
    },
  ],
  exports: ['UserRepository', 'PermissionRepository', 'RoleRepository', 'ArticleRepository'],
})
export class DatabaseModule {}
