import { UserEntity } from '@entity';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/Login.dto';
import { SignupDto } from './dto/Signup.dto';
import { AuthenticatedRequest } from './interfaces/request.interface';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  private async hashToken(token: string): Promise<string> {
    return bcrypt.hash(token, 10);
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersRepository.findOne({
      where: {
        username: username,
      },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }

    return null;
  }

  async login({ username, password }: LoginDto) {
    const user = await this.validateUser(username, password);

    if (!user) {
      throw new BadRequestException('Wrong username or password');
    }

    const payload = { username: user.username, sub: user.id };

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    user.refreshToken = await this.hashToken(refreshToken);
    await this.usersRepository.save(user);

    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '15m',
      }),
      refresh_token: refreshToken,
    };
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      const user = await this.usersRepository.findOne({
        where: { id: payload.sub },
      });

      if (!user || !(await bcrypt.compare(refreshToken, user.refreshToken))) {
        throw new BadRequestException('Invalid refresh token');
      }

      const newPayload = { username: user.username, sub: user.id };

      return {
        access_token: this.jwtService.sign(newPayload, {
          secret: process.env.JWT_SECRET,
          expiresIn: '15m',
        }),
      };
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Invalid refresh token');
    }
  }

  async signup(createUserDto: SignupDto) {
    const {
      username,
      password,
      email,
      firstName,
      lastName,
      dateOfBirth,
      profilePicture,
    } = createUserDto;

    const existingUser = await this.usersRepository.findOne({
      where: [{ username }, { email }],
    });

    if (existingUser) {
      throw new ConflictException('Username or email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.usersRepository.create({
      username,
      password: hashedPassword,
      email,
      firstName,
      lastName,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
      profilePicture,
    });

    await this.usersRepository.save(newUser);

    return {
      username,
      email,
      firstName,
      lastName,
    };
  }

  async revokeRefreshToken(request: AuthenticatedRequest) {
    const userId = request?.user?.sub;

    if (!userId) {
      throw new BadRequestException();
    }

    await this.usersRepository.update(userId, { refreshToken: null });
  }
}
