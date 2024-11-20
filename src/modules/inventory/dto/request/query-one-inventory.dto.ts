import { IsOptional, IsNumber, IsString, IsUUID, IsEmail } from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'

export class QueryOneInventoryDto {
  @ApiPropertyOptional({
    description: 'The unique identifier for the inventory (UUID v4)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsOptional()
  @IsUUID('4', { message: 'UUID must be a valid UUID version 4' })
  readonly uuid?: string

  @ApiPropertyOptional({
    description: 'The unique identifier for the product (UUID v4)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsOptional()
  @IsUUID('4', { message: 'UUID must be a valid UUID version 4' })
  readonly productUuid?: string
}
