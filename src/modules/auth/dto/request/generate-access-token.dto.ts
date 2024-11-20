import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class GenerateAccessTokenDto {
  @ApiProperty({
    description: 'Email of the user',
    example: 'user@example.com',
    required: true,
  })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  readonly email: string

  @ApiProperty({
    description: 'Password for the user account',
    example: 'Password123',
    required: true,
  })
  @IsString({ message: 'Uuid of the user account' })
  @IsNotEmpty({ message: 'uuid of the user required' })
  readonly sub: string
}
