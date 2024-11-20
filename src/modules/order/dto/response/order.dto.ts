import { OrderStatus } from '@modules/order/interfaces/order-status.enum'
import { ProductDto } from '@modules/product/dto'
import { ProfileDto } from '@modules/profile/dtos'
import { ApiProperty } from '@nestjs/swagger'
import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class OrderDto {
  @ApiProperty({
    description: 'The unique identifier of the order',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Expose()
  readonly uuid: string

  @ApiProperty({
    description: 'The quantity of the product in the order',
    example: 5,
  })
  @Expose()
  readonly productQuantity: number

  @ApiProperty({
    description: 'The total charges amount for the order',
    example: '150.00',
  })
  @Expose()
  readonly totalChargesAmount: string

  @ApiProperty({
    description: 'The status of the order',
    example: OrderStatus.PENDING,
  })
  @Expose()
  readonly status: OrderStatus

  @ApiProperty({
    description: 'The profile that placed the order',
    type: ProfileDto,
  })
  @Expose()
  readonly profile: ProfileDto

  @ApiProperty({
    description: 'The profile that placed the order',
    type: ProfileDto,
  })
  @Expose()
  readonly product: ProductDto

  @ApiProperty({
    description: 'The date the order was created',
    example: '2024-11-19T14:30:00Z',
  })
  @Expose()
  readonly createdAt: Date

  @ApiProperty({
    description: 'The date the order was last updated',
    example: '2024-11-19T15:00:00Z',
  })
  @Expose()
  readonly updatedAt: Date
}
