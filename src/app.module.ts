import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { ProductModule } from './product/product.module'
import { ProfileModule } from './profile/profile.module'
import { OrderModule } from './order/order.module'
import { InventoryModule } from './inventory/inventory.module'
import { TransactionModule } from './transaction/transaction.module'

@Module({
  imports: [AuthModule, UserModule, ProductModule, ProfileModule, OrderModule, InventoryModule, TransactionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
