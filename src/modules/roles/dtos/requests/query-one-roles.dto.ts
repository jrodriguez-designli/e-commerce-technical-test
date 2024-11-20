import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsOptional, IsUUID } from 'class-validator'

export class QueryOneRole {
  @ApiProperty()
  @IsUUID()
  @IsOptional()
  readonly uuid?: string

  @ApiProperty()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  readonly isDefault?: string | boolean = false
}
