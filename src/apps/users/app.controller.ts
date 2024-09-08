import {
  Controller,
  Delete,
  Get,
  Put,
  Param,
  Body,
  UseGuards,
  Query,
  Req,
} from '@nestjs/common';
import { UserDto } from './dto/User.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UsersService } from './app.service';
import { JwtAuthGuard } from '@apps/auth/guards/jwt-auth.guard';
import { GetUserQuery } from './dto/GetUserQuery.dto';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers(@Query() query: GetUserQuery): Promise<UserDto[]> {
    return this.usersService.getAllUsers(query);
  }

  @Get('/:username')
  async getUserById(@Param('username') username: string): Promise<UserDto> {
    return this.usersService.getUserByUsername(username);
  }

  @Put('/:username')
  async updateUser(
    @Param('username') username: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req,
  ) {
    return this.usersService.updateUser(username, updateUserDto, req);
  }

  @Delete('/:username')
  async deleteUser(
    @Param('username') username: string,
    @Req() req,
  ): Promise<void> {
    return this.usersService.deleteUser(username, req);
  }
}
