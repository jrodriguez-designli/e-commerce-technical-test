import { InventoryDto } from '@modules/inventory/dto'
import { ApiProperty } from '@nestjs/swagger'
import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class ProductDto {
  @ApiProperty({ description: 'The unique identifier (UUID) of the product' })
  @Expose()
  readonly uuid: string

  @ApiProperty({ description: 'The name of the product' })
  @Expose()
  readonly name: string

  @ApiProperty({ description: 'A brief description of the product' })
  @Expose()
  readonly description: string

  @ApiProperty({ description: 'The price of the product', example: 19.99 })
  @Expose()
  readonly price: number

  @ApiProperty({ description: 'Inventory information of the product', example: 19 })
  @Expose()
  readonly inventory: InventoryDto

  @ApiProperty({ description: 'The creation date of the product' })
  @Expose()
  readonly createdAt: Date

  @ApiProperty({ description: 'The last update date of the product' })
  @Expose()
  readonly updatedAt: Date
}
