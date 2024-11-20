import { Injectable } from '@nestjs/common'
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq'
import { OrderStatus } from '@modules/order/interfaces/order-status.enum'
import { IOrderService } from '@modules/order/interfaces/order-service.interface'
import { Inject } from '@nestjs/common'
import { ORDER_SERVICE, QUEUE_SERVICE } from '@commons/constants/service.constants'
import { IPaymentService } from './interfaces/payment-service.interface'
import { IQueueService } from '@commons/providers/queue-service/interfaces/queue.interface'

@Injectable()
export class PaymentService implements IPaymentService {
  constructor(
    @Inject(QUEUE_SERVICE)
    private readonly queueService: IQueueService,

    //@Inject(ORDER_SERVICE) private readonly orderService: IOrderService,
  ) {}

  async initiatePayment(orderId: string, totalChargesAmount: number): Promise<void> {
    await this.queueService.publishMessage('order-exchange', 'order.payment', {
      orderId,
      totalChargesAmount,
    })
  }

  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<void> {
    console.log('Updating order status' + status)
    //await this.orderService.updateOrder(orderId, status)
  }

  async restoreInventory(orderId: string): Promise<void> {
    console.log('Restoring inventory')
    // await this.orderService.restoreInventory(orderId)
  }
}
