import { ProductDto } from '@modules/product/dto'
import { ApiProperty } from '@nestjs/swagger'
import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class InventoryDto {
  @ApiProperty({ description: 'The unique identifier (UUID) of the inventory item' })
  @Expose()
  readonly uuid: string

  @ApiProperty({ description: 'Description of the inventory item' })
  @Expose()
  readonly stock: number

  @ApiProperty({ description: 'Quantity of the inventory item in stock' })
  @Expose()
  readonly stockMeasure: number

  @ApiProperty({ description: 'Name of the inventory item' })
  @Expose()
  readonly product: ProductDto

  @ApiProperty({ description: 'The creation date of the inventory item' })
  @Expose()
  readonly createdAt: Date

  @ApiProperty({ description: 'The last update date of the inventory item' })
  @Expose()
  readonly updatedAt: Date
}
