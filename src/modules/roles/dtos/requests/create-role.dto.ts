import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { RolesEnum } from '@modules/roles/interfaces/role.enum'

export class CreateRoleDto {
  @ApiProperty()
  @IsEnum(RolesEnum)
  @IsNotEmpty()
  readonly name: RolesEnum

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly description?: string
}
