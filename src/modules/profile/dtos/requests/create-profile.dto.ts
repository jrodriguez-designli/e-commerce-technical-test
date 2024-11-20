import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateProfileDto {
  @ApiProperty({
    description: 'First name of the profile owner',
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  readonly firstName: string

  @ApiProperty({
    description: 'Last name of the profile owner',
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  readonly lastName: string

  @ApiProperty({
    description: 'UUID of the user to which this profile is linked',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsUUID()
  readonly userUuid: string
}
