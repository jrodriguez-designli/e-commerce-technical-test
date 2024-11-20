import { Injectable, Logger } from '@nestjs/common'
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq'
import { IQueueService } from '../interfaces/queue.interface'

@Injectable()
export class RabbitMqService implements IQueueService {
  private readonly logger: Logger

  constructor(private readonly amqpConnection: AmqpConnection) {
    this.logger = new Logger(RabbitMqService.name)
  }

  async publishMessage(exchange: string, routingKey: string, message: any): Promise<void> {
    try {
      await this.amqpConnection.publish(exchange, routingKey, message)
      this.logger.log(`Message published to ${exchange} with routing key ${routingKey}`)
    } catch (error) {
      this.logger.error(`Failed to publish message: ${error.message}`)
      throw error
    }
  }

  subscribeToQueue(queue: string, handler: (msg: any) => void): void {
    // Implement subscription logic here
    console.log(`Subscribed to queue ${queue}`)
  }
}
