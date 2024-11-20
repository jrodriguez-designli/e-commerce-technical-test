import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq'
import { Inject, Injectable } from '@nestjs/common'
import { PaymentService } from './payment.service'
import { OrderStatus } from '@modules/order/interfaces/order-status.enum'
import { IPaymentService } from './interfaces/payment-service.interface'
import { ORDER_SERVICE, PAYMENT_SERVICE } from '@commons/constants/service.constants'
import { IOrderService } from '@modules/order/interfaces/order-service.interface'
import { EventEmitter2 } from '@nestjs/event-emitter'

@Injectable()
export class PaymentProcessor {
  constructor(
    @Inject(PAYMENT_SERVICE)
    private readonly paymentService: IPaymentService,

    @Inject(ORDER_SERVICE)
    private readonly orderService: IOrderService,

    private eventEmitter: EventEmitter2,
  ) {}

  @RabbitSubscribe({
    exchange: 'order-exchange',
    routingKey: 'order.payment',
    queue: 'order-payment-queue',
  })
  async handlePayment(msg: { orderId: string; totalChargesAmount: number }) {
    const { orderId, totalChargesAmount } = msg

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 3000))
      const paymentSuccessful = Math.random() < 0.5 // 50%  success rate

      if (paymentSuccessful) {
        this.eventEmitter.emit('order.update', {
          order: orderId,
          status: OrderStatus.COMPLETED,
        })
      } else {
        this.eventEmitter.emit('order.update', {
          order: orderId,
          status: OrderStatus.FAILED,
        })

        this.eventEmitter.emit('order.restore', {
          order: orderId,
          totalChargesAmount,
        })
        throw new Error('Payment failed')
      }
    } catch (error) {
      throw new Error('Error processing payment: ' + error.message)
    }
  }
}
