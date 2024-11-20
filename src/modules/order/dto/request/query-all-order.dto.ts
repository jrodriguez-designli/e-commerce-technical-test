import { PaginationDto } from '@commons/dtos/pagination-dto/pagination.dto'
import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsUUID } from 'class-validator'

export class QueryAllOrderDto extends PaginationDto {
  @ApiProperty({
    description: 'uuid of the profile',
    example: '4350e760-e6b9-47ab-9b0b-432b00dcb444',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  profileUuid: string
}
