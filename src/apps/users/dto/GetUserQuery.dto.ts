import { ApiProperty } from '@nestjs/swagger';

export class GetUserQuery {
  @ApiProperty({
    description: 'The maximum number of users to retrieve.',
    example: 10,
  })
  readonly limit?: number;

  @ApiProperty({
    description:
      'The number of users to skip before starting to collect the result set.',
    example: 0,
  })
  readonly offset?: number;
}
