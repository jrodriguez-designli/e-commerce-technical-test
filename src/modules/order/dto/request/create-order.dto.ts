import { ApiProperty } from '@nestjs/swagger'
import { IsUUID, IsNumber, IsPositive } from 'class-validator'

export class CreateOrderDto {
  @ApiProperty({
    description: 'The UUID of the product being ordered',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID('4', { message: 'Product UUID must be a valid version 4 UUID' })
  productUuid: string

  @ApiProperty({
    description: 'The quantity of the product to be ordered',
    example: 5,
  })
  @IsNumber()
  @IsPositive({ message: 'Product quantity must be a positive number' })
  productQuantity: number

  @ApiProperty({
    description: 'The UUID of the profile placing the order',
    example: '987e6543-a21c-9f8d-c765-123456789abc',
  })
  @IsUUID('4', { message: 'Profile UUID must be a valid version 4 UUID' })
  profileUuid: string
}
