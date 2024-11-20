import { IsBoolean, IsOptional, IsUUID } from 'class-validator'
import { CreateRoleDto } from './create-role.dto'
import { ApiProperty, PartialType } from '@nestjs/swagger'
import { Transform } from 'class-transformer'

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @ApiProperty()
  @IsUUID()
  uuid: string

  @ApiProperty({
    description: 'Set default role',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  isDefault?: boolean
}
