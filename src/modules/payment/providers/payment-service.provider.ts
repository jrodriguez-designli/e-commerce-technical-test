import { Provider } from '@nestjs/common'
import { PAYMENT_SERVICE } from '@commons/constants/service.constants'
import { PaymentService } from '../payment.service'

export const PaymentServiceProvider: Provider = {
  provide: PAYMENT_SERVICE,
  useClass: PaymentService,
}
