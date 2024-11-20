import { OrderStatus } from '@modules/order/interfaces/order-status.enum'

/**
 * Interface for PaymentService defining the contract for payment-related operations.
 */
export interface IPaymentService {
  /**
   * Initiates the payment process for an order by adding a job to the payment queue.
   * @param orderId - The UUID of the order for which the payment is initiated.
   * @param totalChargesAmount - The total amount to be charged for the order.
   * @returns A promise that resolves when the payment job is successfully added to the queue.
   */
  initiatePayment(orderId: string, totalChargesAmount: number): Promise<void>

  /**
   * Updates the status of an order.
   * @param orderId - The UUID of the order to update.
   * @param status - The new status of the order.
   * @returns A promise that resolves when the order status is successfully updated.
   */
  updateOrderStatus(orderId: string, status: OrderStatus): Promise<void>

  /**
   * Restores the inventory associated with an order when the payment fails or the order is canceled.
   * @param orderId - The UUID of the order for which the inventory should be restored.
   * @returns A promise that resolves when the inventory is successfully restored.
   */
  restoreInventory(orderId: string): Promise<void>
}
