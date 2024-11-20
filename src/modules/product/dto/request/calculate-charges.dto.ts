import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsOptional, Min, IsUUID } from 'class-validator'

export class CalculateChargesDto {
  @ApiProperty({ description: 'The stock quantity of the product', required: false, example: 100 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  readonly quantity?: number

  @ApiProperty({ description: 'The profile uuid of the product', example: '4350e760-e6b9-47ab-9b0b-432b00dcb444' })
  @IsNotEmpty()
  @IsUUID('4', { message: 'Invalid UUID version' })
  readonly uuid: string
}
