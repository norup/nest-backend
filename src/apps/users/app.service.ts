import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserDto } from './dto/User.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UserEntity } from '@entity';
import { GetUserQuery } from './dto/GetUserQuery.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthenticatedRequest } from '@apps/auth/interfaces/request.interface';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getAllUsers(query: GetUserQuery): Promise<UserDto[]> {
    const users: UserDto[] = await this.userRepository
      .createQueryBuilder()
      .limit(query.limit || 10)
      .offset(query.offset || 0)
      .getMany();

    return users;
  }

  async getUserByUsername(username: string): Promise<UserDto> {
    const user: UserDto = await this.userRepository.findOneBy({
      username: username,
    });

    if (!user) {
      throw new NotFoundException(`User with username: ${username} not found`);
    }

    return {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      dateOfBirth: user.dateOfBirth,
      profilePicture: user.profilePicture,
      email: user.email,
    };
  }

  async updateUser(
    username: string,
    updateUserDto: UpdateUserDto,
    request: AuthenticatedRequest,
  ) {
    if (request.user.username !== username) {
      throw new ForbiddenException('You can only update your own profile.');
    }

    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }

    if (updateUserDto.password) {
      const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
      updateUserDto.password = hashedPassword;
    }

    await this.userRepository.update(
      { id: user.id },
      {
        password: updateUserDto.password,
        firstName: updateUserDto.firstName || user.firstName,
        lastName: updateUserDto.lastName || user.lastName,
        dateOfBirth: updateUserDto.dateOfBirth || user.dateOfBirth,
        profilePicture: updateUserDto.profilePicture || user.profilePicture,
      },
    );
  }

  async deleteUser(username: string, request: AuthenticatedRequest) {
    if (request.user.username !== username) {
      throw new ForbiddenException('You can only delete your own profile.');
    }

    const result = await this.userRepository.delete({ username });

    if (result.affected === 0) {
      throw new NotFoundException(`User with username ${username} not found`);
    }
  }
}
