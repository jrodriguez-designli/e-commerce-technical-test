import { Module } from '@nestjs/common'
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq'
import { PaymentService } from './payment.service'
import { OrderModule } from '@modules/order/order.module'
import { PaymentProcessor } from './payment.proccessor'
import { PaymentServiceProvider } from './providers/payment-service.provider'
import { QueueModule } from '@commons/providers/queue-service/queue.module'

@Module({
  imports: [QueueModule, OrderModule],
  providers: [PaymentServiceProvider, PaymentProcessor],
  exports: [PaymentServiceProvider],
})
export class PaymentModule {}
