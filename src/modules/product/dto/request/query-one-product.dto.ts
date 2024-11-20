import { ApiProperty } from '@nestjs/swagger'
import { IsUUID } from 'class-validator'

export class QueryOneProductDto {
  @ApiProperty({ description: 'The unique identifier (UUID) of the product' })
  @IsUUID()
  uuid: string
}
