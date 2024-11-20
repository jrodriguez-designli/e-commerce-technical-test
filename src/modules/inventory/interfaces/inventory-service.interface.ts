import { Transaction } from 'sequelize'
import { CreateInventoryDto, InventoryDto, QueryOneInventoryDto, UpdateInventoryDto } from '../dto'
import { TransactionOperation } from './transaction-operation.enum'

/**
 * Interface for finding an inventory record.
 */
export interface IFindOneInventoryService {
  /**
   * Finds an inventory record based on the query data.
   * @param queryData - The data to query the inventory by.
   * @returns A promise that resolves to the found inventory DTO.
   * @throws NotFoundException if the inventory record is not found.
   */
  findOneInventory(queryData: QueryOneInventoryDto): Promise<InventoryDto>
}

/**
 * Interface for updating an inventory record.
 */
export interface IUpdateInventoryService {
  /**
   * Updates the stock of a product in the inventory.
   * @param data - The data required to update the inventory.
   * @returns A promise that resolves to void.
   * @throws UnprocessableEntityException if there is insufficient stock or an invalid transaction operation.
   * @throws NotFoundException if the inventory record is not found.
   */
  updateInventory(data: UpdateInventoryDto): Promise<void>
}

/**
 * Interface for creating a new inventory record.
 */
export interface ICreateInventoryRecordService {
  /**
   * Creates a new inventory record for a product.
   * @param data - The data required to create the inventory record.
   * @returns A promise that resolves to the created inventory DTO.
   * @throws UnprocessableEntityException if an inventory record already exists for the product.
   * @throws NotFoundException if the product is not found.
   */
  createInventoryRecord(data: CreateInventoryDto, trx?: Transaction): Promise<InventoryDto>
}

/**
 * Global interface that extends all inventory-related services.
 */
export interface IInventoryService
  extends IFindOneInventoryService,
    IUpdateInventoryService,
    ICreateInventoryRecordService {}
