import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsDate, IsUrl, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'The password of the user.',
    example: 'password123',
    required: true,
  })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({
    description: 'The first name of the user.',
    example: 'John',
    required: true,
  })
  @IsOptional()
  @IsString()
  readonly firstName?: string;

  @ApiProperty({
    description: 'The last name of the user.',
    example: 'Doe',
    required: true,
  })
  @IsOptional()
  @IsString()
  readonly lastName?: string;

  @ApiProperty({
    description: 'The date of birth of the user.',
    example: '1990-01-01',
    required: false,
  })
  @IsOptional()
  @IsDate()
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
