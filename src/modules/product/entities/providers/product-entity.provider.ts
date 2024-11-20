import { PRODUCT_REPOSITORY } from '@commons/constants/entities.constants'
import { Product } from '../product.entity'

export const ProductEntityProvider = [
  {
    provide: PRODUCT_REPOSITORY,
    useValue: Product,
  },
]
