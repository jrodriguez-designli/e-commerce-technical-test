export interface IQueueService {
  /**
   * Publishes a message to a specific exchange with a routing key.
   * @param exchange - The name of the exchange to publish to.
   * @param routingKey - The routing key for the message.
   * @param message - The content of the message to publish.
   * @returns A promise that resolves when the message is published successfully.
   */
  publishMessage(exchange: string, routingKey: string, message: any): Promise<void>

  /**
   * Subscribes a consumer to a specific queue.
   * @param queue - The name of the queue to subscribe to.
   * @param handler - The function to process the received messages.
   */
  subscribeToQueue(queue: string, handler: (msg: any) => void): void
}
