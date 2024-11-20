import { Module } from '@nestjs/common'
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq'
import { QueueServiceProvider } from './providers/rabbit-mq-service.provider'
import { EXCHANGE_NAME, EXCHANGE_TYPE, URI } from '@commons/constants/queue.constants'

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: EXCHANGE_NAME,
          type: EXCHANGE_TYPE,
        },
      ],
      uri: URI,
    }),
  ],
  providers: [QueueServiceProvider],
  exports: [QueueServiceProvider, RabbitMQModule],
})
export class QueueModule {}
