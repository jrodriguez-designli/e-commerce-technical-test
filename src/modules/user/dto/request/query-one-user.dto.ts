import { IsOptional, IsNumber, IsString, IsUUID, IsEmail } from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'

export class QueryOneUserDto {
  @ApiPropertyOptional({
    description: 'The unique identifier for the user (UUID v4)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsOptional()
  @IsUUID('4', { message: 'UUID must be a valid UUID version 4' })
  readonly uuid?: string

  @ApiPropertyOptional({
    description: 'The email address of the user',
    example: 'user@example.com',
  })
  @IsOptional()
  @IsEmail({}, { message: 'Email must be a valid email address' })
  readonly email?: string
}
