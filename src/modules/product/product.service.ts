import {
  Injectable,
  NotFoundException,
  ConflictException,
  Inject,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common'
import { PRODUCT_REPOSITORY, PROFILE_REPOSITORY } from '@commons/constants/entities.constants'
import { Product } from './entities/product.entity'
import {
  CreateProductDto,
  QueryAllProductsDto,
  QueryOneProductDto,
  UpdateProductDto,
  ProductDto,
  CalculateChargesDto,
} from './dto'
import { plainToInstanceFunction } from '@commons/providers/transform-data/plain-to-instance.dto'
import { IProductService } from './interfaces/product-service.interface'
import { getIdAttribute } from '@commons/providers/generic-entity-resolver/entity-id-attribute.provider'
import { calculateRoundedAmount } from '@commons/providers/numbers/round-number.provider'
import { Profile } from '@modules/profile/entities/profile.entity'
import { INVENTORY_SERVICE } from '@commons/constants/service.constants'
import { IInventoryService } from '@modules/inventory/interfaces/inventory-service.interface'
import { Inventory } from '@modules/inventory/entities/inventory.entity'
import { TransactionOperation } from '@modules/inventory/interfaces/transaction-operation.enum'

@Injectable()
export class ProductService implements IProductService {
  private readonly logger: Logger

  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: typeof Product,

    @Inject(INVENTORY_SERVICE)
    private readonly inventoryService: IInventoryService,
  ) {
    this.logger = new Logger(ProductService.name)
  }

  async create(data: CreateProductDto): Promise<ProductDto> {
    try {
      const { name, profileUuid, stock, stockMeasure } = data

      const profileId = await getIdAttribute(PROFILE_REPOSITORY, profileUuid)

      const existingProduct = await this.productRepository.findOne({ where: { name, profileId, deletedAt: null } })

      if (existingProduct) {
        return plainToInstanceFunction(ProductDto, existingProduct) as ProductDto
      }

      const createdProduct = await this.productRepository.create({ ...data, profileId })

      await this.inventoryService.createInventoryRecord({
        productUuid: createdProduct.uuid,
        initialStock: stock,
        stockMeasure,
      })

      return plainToInstanceFunction(ProductDto, createdProduct) as ProductDto
    } catch (error) {
      this.logger.error(error)
      throw new UnprocessableEntityException('An error occurred while creating the product: ' + error.message)
    }
  }

  async findAll(queryParams: QueryAllProductsDto): Promise<ProductDto[]> {
    try {
      const { limit, offset, order, profileUuid } = queryParams

      const products = await this.productRepository.findAll({
        limit,
        offset,
        order,
        where: { deletedAt: null },
        include: [
          {
            model: Profile,
            attributes: ['uuid'],
            ...(profileUuid ? { where: { uuid: profileUuid } } : {}),
          },
          {
            model: Inventory,
            attributes: ['uuid', 'stock', 'stockMeasure'],
          },
        ],
      })

      return plainToInstanceFunction(ProductDto, products) as ProductDto[]
    } catch (error) {
      this.logger.error(error)
      throw new UnprocessableEntityException('An error occurred while fetching products: ' + error.message)
    }
  }

  async findOne(queryParams: QueryOneProductDto): Promise<ProductDto> {
    try {
      const whereCondition = {
        ...queryParams,
        deletedAt: null,
      }

      const product = await this.productRepository.findOne({
        where: { ...whereCondition },
        include: [
          {
            model: Inventory,
            attributes: ['uuid', 'stock', 'stockMeasure'],
          },
        ],
      })

      if (!product) {
        throw new NotFoundException('Product not found')
      }

      return plainToInstanceFunction(ProductDto, product) as ProductDto
    } catch (error) {
      this.logger.error(error)
      throw new UnprocessableEntityException('An error occurred while fetching product: ' + error.message)
    }
  }

  async update(updateProductDto: UpdateProductDto): Promise<ProductDto> {
    try {
      const { uuid, stock, profileUuid, ...rest } = updateProductDto

      const product = await this.productRepository.findOne({ where: { uuid, deletedAt: null } })

      if (!product) {
        throw new NotFoundException('Product not found')
      }

      if (rest.name) {
        const existingProduct = await this.productRepository.findOne({
          where: { name: rest.name },
          include: [
            {
              model: Profile,
              attributes: ['uuid'],
              ...(profileUuid ? { where: { uuid: profileUuid } } : {}),
            },
          ],
        })

        if (existingProduct && existingProduct.uuid !== uuid) {
          throw new ConflictException('Another product with this name already exists')
        }
      }

      if (stock) {
        await this.inventoryService.updateInventory({
          productUuid: product.uuid,
          quantity: stock,
          operation: TransactionOperation.ADD,
        })
      }

      const updatedProduct = await product.update({ ...rest })
      await updatedProduct.save()

      return plainToInstanceFunction(ProductDto, updatedProduct) as ProductDto
    } catch (error) {
      this.logger.error(error)
      throw new UnprocessableEntityException('An error occurred while updating the product: ' + error.message)
    }
  }

  async delete(uuid: string): Promise<void> {
    try {
      const product = await this.productRepository.findOne({ where: { uuid, deletedAt: null } })

      if (!product) {
        throw new NotFoundException('Product not found')
      }

      await product.destroy()
      await product.save()
    } catch (error) {
      this.logger.error(error)
      throw new UnprocessableEntityException('An error occurred while deleting the product: ' + error.message)
    }
  }

  async calculateProductCharges(data: CalculateChargesDto): Promise<number> {
    try {
      const { uuid, quantity } = data

      const product = await this.findOne({ uuid })

      const totalChargesAmount = calculateRoundedAmount(product.price * quantity)
      return totalChargesAmount
    } catch (error) {
      this.logger.error(error)
      throw new UnprocessableEntityException(
        'An error occurred while calculating the product charges: ' + error.message,
      )
    }
  }
}
