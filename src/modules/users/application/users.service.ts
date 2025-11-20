import { Injectable, Inject, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { User } from '../domain/user.entity';
import type { UserRepository } from '../domain/user.repository';
import { CreateUserRequest } from './dtos/create-user.request';
import { UserResponse } from './dtos/user.response';
import { UpdateUserRequest } from './dtos/update-user.request';
import type { RoleRepository } from 'src/modules/roles/domains/role.repository';
import type { HashService } from 'src/modules/auth/domain/hash.service.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    @Inject('RoleRepository')
    private readonly roleRepository: RoleRepository,
    @Inject('HashService')
    private readonly hashService: HashService,
  ) {}

  async createUser(createUserDto: CreateUserRequest): Promise<UserResponse> {
    const existing = await this.userRepository.findByEmail(String(createUserDto.email));
    if (existing) {
      throw new ConflictException('User already exists');
    }

    const role = await this.roleRepository.findBySlug(createUserDto.role);

    if (!role) {
      throw new BadRequestException('Invalid role');
    }

    const hashedPassword = await this.hashService.hash(createUserDto.password);

    const id = crypto.randomUUID();

    const user = new User(id, createUserDto.name, createUserDto.email, hashedPassword, role);

    await this.userRepository.save(user);
    return UserResponse.fromDomain(user);
  }

  async getUserById(id: string): Promise<UserResponse> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return UserResponse.fromDomain(user);
  }

  async updateUser(id: string, updateUserDto: UpdateUserRequest): Promise<UserResponse> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updateUserDto.role) {
      const role = await this.roleRepository.findBySlug(updateUserDto.role);
      if (!role) {
        throw new BadRequestException('Invalid role');
      }
      user.role = role;
    }

    if (updateUserDto.name) {
      user.name = updateUserDto.name;
    }

    if (updateUserDto.email) {
      user.email = updateUserDto.email;
    }

    await this.userRepository.save(user);
    return UserResponse.fromDomain(user);
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.delete(user);
  }
}
