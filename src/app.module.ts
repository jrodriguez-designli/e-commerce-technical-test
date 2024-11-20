import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { EventEmitterModule } from '@nestjs/event-emitter'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from '@modules/auth/auth.module'
import { UserModule } from '@modules/user/user.module'
import { ProductModule } from '@modules/product/product.module'
import { OrderModule } from '@modules/order/order.module'
import { InventoryModule } from '@modules/inventory/inventory.module'
import { DatabaseModule } from './database/database.module'
import { RolesModule } from '@modules/roles/roles.module'
import { ProfileModule } from '@modules/profile/profile.module'
import { PaymentModule } from './modules/payment/payment.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EventEmitterModule.forRoot(),
    DatabaseModule,

    AuthModule,
    UserModule,
    RolesModule,
    ProductModule,
    ProfileModule,
    OrderModule,
    InventoryModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
