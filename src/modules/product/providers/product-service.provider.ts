import { Provider } from '@nestjs/common'
import { ProductService } from '../product.service'
import { PRODUCT_SERVICE } from '@commons/constants/service.constants'

export const ProductServiceProvider: Provider = {
  provide: PRODUCT_SERVICE,
  useClass: ProductService,
}
