import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './app.service';
import { LoginDto } from './dto/Login.dto';
import { SignupDto } from './dto/Signup.dto';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { AuthController } from './app.controller';

const mockAuthService = {
  login: jest.fn(),
  signup: jest.fn(),
  refreshAccessToken: jest.fn(),
  revokeRefreshToken: jest.fn(),
};

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  describe('login', () => {
    it('should return tokens on successful login', async () => {
      const loginDto: LoginDto = { username: 'john', password: '123456' };
      const result = {
        access_token: 'access_token',
        refresh_token: 'refresh_token',
      };

      mockAuthService.login.mockResolvedValue(result);

      expect(await authController.login(loginDto)).toBe(result);
    });

    it('should throw BadRequestException on failed login', async () => {
      const loginDto: LoginDto = {
        username: 'john',
        password: 'wrongpassword',
      };

      mockAuthService.login.mockRejectedValue(
        new BadRequestException('Wrong username or password'),
      );

      await expect(authController.login(loginDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('signup', () => {
    it('should return user details on successful signup', async () => {
      const signupDto: SignupDto = {
        username: 'john',
        password: '123456',
        email: 'john@example.com',
        firstName: 'John',
        lastName: 'Doe',
      };
      const result = {
        username: 'john',
        email: 'john@example.com',
        firstName: 'John',
        lastName: 'Doe',
      };

      mockAuthService.signup.mockResolvedValue(result);

      expect(await authController.signup(signupDto)).toBe(result);
    });

    it('should throw ConflictException if username or email already exists', async () => {
      const signupDto: SignupDto = {
        username: 'john',
        password: '123456',
        email: 'john@example.com',
        firstName: 'John',
        lastName: 'Doe',
      };

      mockAuthService.signup.mockRejectedValue(
        new ConflictException('Username or email already exists'),
      );

      await expect(authController.signup(signupDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('refreshToken', () => {
    it('should return new access token on valid refresh token', async () => {
      const refreshToken = 'valid_refresh_token';
      const result = { access_token: 'new_access_token' };

      mockAuthService.refreshAccessToken.mockResolvedValue(result);

      expect(await authController.refreshToken(refreshToken)).toBe(result);
    });

    it('should throw BadRequestException on invalid refresh token', async () => {
      const refreshToken = 'invalid_refresh_token';

      mockAuthService.refreshAccessToken.mockRejectedValue(
        new BadRequestException('Invalid refresh token'),
      );

      await expect(authController.refreshToken(refreshToken)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('logout', () => {
    it('should call revokeRefreshToken', async () => {
      const req = { user: { sub: 1 } };

      await authController.logout(req as any);

      expect(mockAuthService.revokeRefreshToken).toHaveBeenCalledWith(req);
    });
  });
});
