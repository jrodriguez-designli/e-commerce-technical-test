import { ApiProperty } from '@nestjs/swagger'

export class AccessDto {
  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  readonly accessToken: string

  @ApiProperty({
    description: 'Subject identifier, typically the user ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  readonly sub: string

  @ApiProperty({
    description: 'Email of the authenticated user',
    example: 'user@example.com',
  })
  readonly email: string
}
