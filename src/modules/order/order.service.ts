import { Injectable, Inject, NotFoundException, UnprocessableEntityException, Logger } from '@nestjs/common'
import { ORDER_REPOSITORY, PRODUCT_REPOSITORY, PROFILE_REPOSITORY } from '@commons/constants/entities.constants'
import { Order } from './entities/order.entity'
import { Product } from '@modules/product/entities/product.entity'
import { Profile } from '@modules/profile/entities/profile.entity'
import { OrderStatus } from './interfaces/order-status.enum'
import { plainToInstanceFunction } from '@commons/providers/transform-data/plain-to-instance.dto'
import {
  INVENTORY_SERVICE,
  PAYMENT_SERVICE,
  PRODUCT_SERVICE,
  PROFILE_SERVICE,
} from '@commons/constants/service.constants'
import { IProductService } from '@modules/product/interfaces/product-service.interface'
import { getIdAttribute } from '@commons/providers/generic-entity-resolver/entity-id-attribute.provider'
import { IInventoryService } from '@modules/inventory/interfaces/inventory-service.interface'
import { TransactionOperation } from '@modules/inventory/interfaces/transaction-operation.enum'
import { CreateOrderDto, OrderDto, QueryAllOrderDto, QueryOneOrderDto } from './dto'
import { IOrderService } from './interfaces/order-service.interface'
import { LazyModuleLoader } from '@nestjs/core'
import { PaymentModule } from '@modules/payment/payment.module'
import { PaymentService } from '@modules/payment/payment.service'

@Injectable()
export class OrderService implements IOrderService {
  private readonly logger: Logger

  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: typeof Order,

    @Inject(PRODUCT_SERVICE)
    private readonly productService: IProductService,

    @Inject(INVENTORY_SERVICE)
    private readonly inventoryService: IInventoryService,

    private readonly lazyModuleLoader: LazyModuleLoader,
  ) {
    this.logger = new Logger(OrderService.name)
  }

  async createOrder(data: CreateOrderDto): Promise<OrderDto> {
    const { productUuid, productQuantity, profileUuid } = data

    // Check Ids existence
    const productId = await getIdAttribute(PRODUCT_REPOSITORY, productUuid)
    const profileId = await getIdAttribute(PROFILE_REPOSITORY, profileUuid)

    // Check if product quantity is sufficient
    await this.inventoryService.updateInventory({
      productUuid,
      quantity: productQuantity,
      operation: TransactionOperation.SUBTRACT,
    })

    // Calculate total charges amount
    const totalChargesAmount = await this.productService.calculateProductCharges({
      uuid: productUuid,
      quantity: productQuantity,
    })

    // Create order
    const createdOrder = await this.orderRepository.create({
      productId,
      productQuantity,
      profileId,
      totalChargesAmount,
      status: OrderStatus.PENDING,
    })

    await this.lazyCheckPreferences(createdOrder.uuid, totalChargesAmount)

    return plainToInstanceFunction(OrderDto, createdOrder) as OrderDto
  }

  private async lazyCheckPreferences(orderUuid, totalChargesAmount): Promise<void> {
    try {
      const moduleRef = await this.lazyModuleLoader.load(() => PaymentModule)

      const paymentService = moduleRef.get(PAYMENT_SERVICE)

      await paymentService.initiatePayment(orderUuid, totalChargesAmount)
    } catch (error) {
      this.logger.error(error)
      throw new UnprocessableEntityException(error)
    }
  }

  async findOneOrder(queryParam: QueryOneOrderDto): Promise<OrderDto> {
    try {
      const { uuid } = queryParam

      const order = await this.orderRepository.findOne({
        where: { uuid, deletedAt: null },
        include: [
          {
            model: Product,
            where: { deletedAt: null },
            attributes: ['uuid', 'name', 'description', 'price', 'createdAt', 'updatedAt'],
          },
          {
            model: Profile,
            where: { deletedAt: null },
            attributes: ['uuid'],
          },
        ],
      })

      if (!order) {
        throw new NotFoundException('Order not found')
      }

      return plainToInstanceFunction(OrderDto, order) as OrderDto
    } catch (error) {
      this.logger.error(error)
      throw new UnprocessableEntityException('there is an error in the request: ' + error.message)
    }
  }

  async findAllOrders(queryData: QueryAllOrderDto): Promise<OrderDto[]> {
    try {
      const { profileUuid, order, offset, limit } = queryData

      const orders = await this.orderRepository.findAll({
        order,
        limit,
        offset,
        where: { deletedAt: null },
        include: [
          {
            model: Product,
            attributes: ['uuid', 'name', 'description', 'price', 'createdAt', 'updatedAt'],
            where: { deletedAt: null },
          },
          {
            model: Profile,
            attributes: ['uuid'],
            where: { ...(profileUuid ? { uuid: profileUuid } : {}) },
          },
        ],
      })

      if (!orders || orders.length === 0) {
        throw new NotFoundException('No orders found for the specified profile')
      }

      return plainToInstanceFunction(OrderDto, orders) as OrderDto[]
    } catch (error) {
      this.logger.error('Error fetching orders: ' + error.message)
      throw new UnprocessableEntityException('There is an error in the request: ' + error.message)
    }
  }

  async updateOrder(orderId: string, status: OrderStatus): Promise<void> {
    await this.orderRepository.update({ status }, { where: { uuid: orderId } })
  }

  async restoreInventory(orderId: string): Promise<void> {
    const order = await this.orderRepository.findOne({ where: { uuid: orderId }, include: [Product] })
    if (order) {
      await this.inventoryService.updateInventory({
        productUuid: order.product.uuid,
        quantity: order.productQuantity,
        operation: TransactionOperation.ADD,
      })
    }
  }
}
