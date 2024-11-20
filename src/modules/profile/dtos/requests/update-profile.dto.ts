import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
import { CreateProfileDto } from './create-profile.dto'
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger'

export class UpdateProfileDto extends PartialType(OmitType(CreateProfileDto, ['userUuid'] as const)) {
  @ApiProperty({
    description: 'uuid of the profile to be updated',
    example: ' 123e4567-e89b-12d3-a456-426614174000',
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  uuid?: string
}
