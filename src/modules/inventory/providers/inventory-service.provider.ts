import { Provider } from '@nestjs/common'
import { InventoryService } from '../inventory.service'
import { INVENTORY_SERVICE } from '@commons/constants/service.constants'

export const InventoryServiceProvider: Provider = {
  provide: INVENTORY_SERVICE,
  useClass: InventoryService,
}
