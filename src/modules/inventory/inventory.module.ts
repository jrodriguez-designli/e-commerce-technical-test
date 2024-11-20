import { Module } from '@nestjs/common'
import { InventoryEntityProvider } from './entities/providers/inventory-entity.provider'
import { InventoryTransactionEntityProvider } from './entities/providers/inventory-transaction-entity.provider'
import { InventoryServiceProvider } from './providers/inventory-service.provider'

@Module({
  providers: [InventoryServiceProvider, ...InventoryEntityProvider, ...InventoryTransactionEntityProvider],
  exports: [InventoryServiceProvider],
})
export class InventoryModule {}
