import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateUserRequest } from './application/dtos/create-user.request';
import { UpdateUserRequest } from './application/dtos/update-user.request';
import { UserResponse } from './application/dtos/user.response';
import { UsersService } from './application/users.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { RequirePermissions } from '../auth/decorators/require-permissions.decorator';
import { PermissionAction, PermissionSubject } from '../permissions/domain/enums';

@Controller('users')
@UseGuards(AuthGuard, PermissionsGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @RequirePermissions(
    { subject: PermissionSubject.USERS, action: PermissionAction.CREATE },
    { subject: PermissionSubject.USERS, action: PermissionAction.MANAGE },
  )
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserRequest): Promise<UserResponse> {
    return await this.usersService.createUser(createUserDto);
  }

  @Get(':id')
  @RequirePermissions(
    { subject: PermissionSubject.USERS, action: PermissionAction.READ },
    { subject: PermissionSubject.USERS, action: PermissionAction.MANAGE },
  )
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<UserResponse> {
    return await this.usersService.getUserById(id);
  }

  @Put(':id')
  @RequirePermissions(
    { subject: PermissionSubject.USERS, action: PermissionAction.UPDATE },
    { subject: PermissionSubject.USERS, action: PermissionAction.MANAGE },
  )
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserRequest,
  ): Promise<UserResponse> {
    return await this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @RequirePermissions(
    { subject: PermissionSubject.USERS, action: PermissionAction.DELETE },
    { subject: PermissionSubject.USERS, action: PermissionAction.MANAGE },
  )
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.usersService.deleteUser(id);
  }
}
