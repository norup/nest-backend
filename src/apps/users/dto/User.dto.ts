import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    description: 'The unique identifier of the user.',
    example: 'e4b9d91e-06f3-4d6e-b730-02c4e6466da5',
  })
  readonly id: string;

  @ApiProperty({
    description: 'The username of the user.',
    example: 'john_doe',
  })
  readonly username: string;

  @ApiProperty({
    description: 'The first name of the user.',
    example: 'John',
  })
  readonly firstName: string;

  @ApiProperty({
    description: 'The last name of the user.',
    example: 'Doe',
  })
  readonly lastName: string;

  @ApiProperty({
    description: 'The email address of the user.',
    example: 'john.doe@example.com',
  })
  readonly email: string;

  @ApiProperty({
    description: 'The date of birth of the user.',
    example: '1990-01-01',
    required: false,
  })
  readonly dateOfBirth?: Date;

  @ApiProperty({
    description: 'The profile picture URL of the user.',
    example: 'https://example.com/profile.jpg',
    required: false,
  })
  readonly profilePicture?: string;
}
