import { ORDER_REPOSITORY } from 'src/commons/constants/entities.constants'
import { Order } from '../order.entity'

export const orderEntityProvider = [
  {
    provide: ORDER_REPOSITORY,
    useValue: Order,
  },
]
