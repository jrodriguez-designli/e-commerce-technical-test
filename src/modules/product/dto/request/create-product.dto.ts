import { UnitOfMeasure } from '@modules/inventory/interfaces/unit-mesure.enum'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsNumber, IsOptional, Min, IsUUID, IsEnum } from 'class-validator'

export class CreateProductDto {
  @ApiProperty({ description: 'The name of the product' })
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @ApiProperty({ description: 'A brief description of the product' })
  @IsString()
  @IsNotEmpty()
  readonly description: string

  @ApiProperty({ description: 'The price of the product', example: 19.99 })
  @IsNumber()
  @Min(0)
  readonly price: number

  @ApiProperty({ description: 'The stock quantity of the product', required: false, example: 100 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  readonly stock?: number

  @ApiProperty({ description: 'The stock measure of the product', required: false, example: 100 })
  @IsEnum(UnitOfMeasure)
  readonly stockMeasure?: UnitOfMeasure

  @ApiProperty({ description: 'The profile uuid of the product', example: '4350e760-e6b9-47ab-9b0b-432b00dcb444' })
  @IsNotEmpty()
  @IsUUID('4', { message: 'Invalid UUID version' })
  readonly profileUuid: string
}
