import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LoginService } from './application/login.service';
import { AuthGuard } from './guards/auth.guard';
import { PermissionsGuard } from './guards/permissions.guard';

@Module({
  controllers: [AuthController],
  providers: [LoginService, AuthGuard, PermissionsGuard],
  exports: [LoginService, AuthGuard, PermissionsGuard],
})
export class AuthModule {}
