import { Provider } from '@nestjs/common'
import { QUEUE_SERVICE } from '@commons/constants/service.constants'
import { RabbitMqService } from '../rabbit-mq/rabbit-mq.service'

export const QueueServiceProvider: Provider = {
  provide: QUEUE_SERVICE,
  useClass: RabbitMqService,
}
