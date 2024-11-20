import { Module } from '@nestjs/common'
import { OrderController } from './order.controller'
import { orderEntityProvider } from './entities/providers/order-entity-provider'
import { ProductModule } from '@modules/product/product.module'
import { InventoryModule } from '@modules/inventory/inventory.module'
import { OrderServiceProvider } from './providers/order-service.provider'

@Module({
  controllers: [OrderController],
  providers: [OrderServiceProvider, ...orderEntityProvider],
  imports: [ProductModule, InventoryModule],
  exports: [OrderServiceProvider],
})
export class OrderModule {}
