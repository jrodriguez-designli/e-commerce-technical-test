import { UnitOfMeasure } from '@modules/inventory/interfaces/unit-mesure.enum'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNumber, IsUUID, Min } from 'class-validator'

export class CreateInventoryDto {
  @ApiProperty({ description: 'UUID of the product' })
  @IsUUID()
  readonly productUuid: string

  @ApiProperty({ description: 'Initial stock quantity' })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  readonly initialStock: number

  @ApiProperty({ description: 'Unit of measure for the stock' })
  @IsEnum(UnitOfMeasure)
  readonly stockMeasure: UnitOfMeasure
}
