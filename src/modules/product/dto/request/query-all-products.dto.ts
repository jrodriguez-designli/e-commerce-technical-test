import { PaginationDto } from '@commons/dtos/pagination-dto/pagination.dto'
import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsOptional, IsUUID } from 'class-validator'

export class QueryAllProductsDto extends PaginationDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  profileUuid?: string
}
