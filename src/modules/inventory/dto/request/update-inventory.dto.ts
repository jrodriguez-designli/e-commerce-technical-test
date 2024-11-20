import { PartialType } from '@nestjs/mapped-types'
import { ApiProperty } from '@nestjs/swagger'
import { CreateInventoryDto } from './create-inventory.dto'
import { TransactionOperation } from '@modules/inventory/interfaces/transaction-operation.enum'

export class UpdateInventoryDto extends PartialType(CreateInventoryDto) {
  @ApiProperty({
    description: 'The UUID of the product whose inventory is being updated',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  readonly productUuid: string

  @ApiProperty({
    description: 'The number by which the inventory will change ',
    example: 10,
  })
  readonly quantity: number

  @ApiProperty({
    enum: TransactionOperation,
    description: 'The type of operation for the inventory transaction (ADD or SUBTRACT)',
    example: TransactionOperation.ADD,
  })
  readonly operation: TransactionOperation
}
