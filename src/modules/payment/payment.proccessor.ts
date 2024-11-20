import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq'
import { Inject, Injectable } from '@nestjs/common'
import { PaymentService } from './payment.service'
import { OrderStatus } from '@modules/order/interfaces/order-status.enum'
import { IPaymentService } from './interfaces/payment-service.interface'
import { PAYMENT_SERVICE } from '@commons/constants/service.constants'

@Injectable()
export class PaymentProcessor {
  constructor(
    @Inject(PAYMENT_SERVICE)
    private readonly paymentService: IPaymentService,
  ) {}

  @RabbitSubscribe({
    exchange: 'order-exchange',
    routingKey: 'order.payment',
    queue: 'order-payment-queue',
  })
  async handlePayment(msg: { orderId: string; totalChargesAmount: number }) {
    const { orderId, totalChargesAmount } = msg

    try {
      // Simula el procesamiento del pago
      await new Promise((resolve) => setTimeout(resolve, 3000))
      const paymentSuccessful = Math.random() < 0.01 // 80% de probabilidad de éxito

      if (paymentSuccessful) {
        await this.paymentService.updateOrderStatus(orderId, OrderStatus.COMPLETED)
      } else {
        await this.paymentService.updateOrderStatus(orderId, OrderStatus.FAILED)
        await this.paymentService.restoreInventory(orderId)
        throw new Error('Payment failed')
      }
    } catch (error) {
      throw new Error('Error processing payment: ' + error.message)
    }
  }
}
