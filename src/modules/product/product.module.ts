import { Module } from '@nestjs/common'
import { ProductController } from './product.controller'
import { ProductEntityProvider } from './entities/providers/product-entity.provider'
import { ProductServiceProvider } from './providers/product-service.provider'
import { InventoryModule } from '@modules/inventory/inventory.module'

@Module({
  controllers: [ProductController],
  providers: [ProductServiceProvider, ...ProductEntityProvider],
  exports: [ProductServiceProvider],
  imports: [InventoryModule],
})
export class ProductModule {}
