import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEmail,
  IsUrl,
} from 'class-validator';

export class SignupDto {
  @ApiProperty({
    description: 'The username of the user.',
    example: 'john_doe',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({
    description: 'The password of the user.',
    example: 'password123',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({
    description: 'The first name of the user.',
    example: 'John',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @ApiProperty({
    description: 'The last name of the user.',
    example: 'Doe',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @ApiProperty({
    description: 'The email address of the user.',
    example: 'john.doe@example.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    description: 'The date of birth of the user.',
    example: '1990-01-01',
    required: false,
  })
  @IsOptional()
  readonly dateOfBirth?: Date;

  @ApiProperty({
    description: 'The profile picture URL of the user.',
    example: 'https://example.com/profile.jpg',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  readonly profilePicture?: string;
}
