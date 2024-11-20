import { INVENTORY_TRANSACTION_REPOSITORY } from '@commons/constants/entities.constants'
import { InventoryTransaction } from '../inventory-transaction.entity'

export const InventoryTransactionEntityProvider = [
  {
    provide: INVENTORY_TRANSACTION_REPOSITORY,
    useValue: InventoryTransaction,
  },
]
