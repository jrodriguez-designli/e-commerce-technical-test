import { CreateOrderDto, OrderDto, QueryAllOrderDto, QueryOneOrderDto } from '../dto'
import { OrderStatus } from './order-status.enum'

/**
 * Interface for creating an order.
 */
export interface ICreateOrderService {
  /**
   * Creates a new order.
   * @param data - The data to create an order.
   * @returns A promise that resolves to the created order DTO.
   * @throws UnprocessableEntityException if there is an error during creation.
   */
  createOrder(data: CreateOrderDto): Promise<OrderDto>
}

/**
 * Interface for finding a specific order.
 */
export interface IFindOneOrderService {
  /**
   * Finds a specific order by UUID.
   * @param queryParam - The query parameter containing the UUID of the order.
   * @returns A promise that resolves to the found order DTO.
   * @throws NotFoundException if the order is not found.
   */
  findOneOrder(queryParam: QueryOneOrderDto): Promise<OrderDto>
}

/**
 * Interface for finding all orders.
 */
export interface IFindAllOrdersService {
  /**
   * Finds all orders for a specific profile.
   * @param queryData - The data to query all orders.
   * @returns A promise that resolves to an array of order DTOs.
   * @throws NotFoundException if no orders are found.
   */
  findAllOrders(queryData: QueryAllOrderDto): Promise<OrderDto[]>
}

/**
 * Interface for updating an order.
 *
 */
export interface IUpdateOrderService {
  /**
   * Updates the status of an order.
   * @param orderId - The UUID of the order to update.
   * @param status - The new status of the order.
   * @returns A promise that resolves to void.
   * @throws UnprocessableEntityException if there is an error during update.
   */
  updateOrder(orderId: string, status: OrderStatus): Promise<void>

  restoreInventory(orderId: string): Promise<void>
}

/**
 * Global interface that extends all order-related services.
 */
export interface IOrderService
  extends ICreateOrderService,
    IFindOneOrderService,
    IFindAllOrdersService,
    IUpdateOrderService {}
