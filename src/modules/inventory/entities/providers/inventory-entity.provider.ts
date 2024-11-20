import { INVENTORY_REPOSITORY } from '@commons/constants/entities.constants'
import { Inventory } from '../inventory.entity'

export const InventoryEntityProvider = [
  {
    provide: INVENTORY_REPOSITORY,
    useValue: Inventory,
  },
]
