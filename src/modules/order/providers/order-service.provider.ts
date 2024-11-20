import { Provider } from '@nestjs/common'
import { OrderService } from '../order.service'
import { ORDER_SERVICE } from '@commons/constants/service.constants'

export const OrderServiceProvider: Provider = {
  provide: ORDER_SERVICE,
  useClass: OrderService,
}
