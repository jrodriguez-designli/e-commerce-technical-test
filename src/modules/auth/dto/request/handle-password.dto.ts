import { IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class HandlePasswordDto {
  @ApiProperty({
    description: 'password of the user',
    example: 'ThisIsMyPassword',
    required: true,
  })
  @IsString({ message: 'Email must be a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  readonly password: string

  @ApiProperty({
    description: 'uuid of the user',
    example: '12345678-1234-1234-1234-123456789012',
    required: true,
  })
  @IsUUID('4', { message: 'uuid must be a string' })
  @IsNotEmpty({ message: 'uuid is required' })
  readonly userId: string
}
