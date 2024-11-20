import { Injectable, Inject, NotFoundException, UnprocessableEntityException, Logger } from '@nestjs/common'
import {
  INVENTORY_REPOSITORY,
  PRODUCT_REPOSITORY,
  INVENTORY_TRANSACTION_REPOSITORY,
} from '@commons/constants/entities.constants'
import { Inventory } from './entities/inventory.entity'
import { Product } from '@modules/product/entities/product.entity'
import { plainToInstanceFunction } from '@commons/providers/transform-data/plain-to-instance.dto'
import { CreateInventoryDto, InventoryDto, QueryOneInventoryDto } from './dto'
import { getIdAttribute } from '@commons/providers/generic-entity-resolver/entity-id-attribute.provider'
import { UpdateInventoryDto } from './dto/request/update-inventory.dto'
import { TransactionOperation } from '@modules/inventory/interfaces/transaction-operation.enum'
import { InventoryTransaction } from './entities/inventory-transaction.entity'
import { IInventoryService } from './interfaces/inventory-service.interface'
import { Transaction } from 'sequelize'

@Injectable()
export class InventoryService implements IInventoryService {
  private readonly logger: Logger

  constructor(
    @Inject(INVENTORY_REPOSITORY)
    private readonly inventoryRepository: typeof Inventory,

    @Inject(INVENTORY_TRANSACTION_REPOSITORY)
    private readonly inventoryTransactionRepository: typeof InventoryTransaction,
  ) {
    this.logger = new Logger(InventoryService.name)
  }

  async createInventoryRecord(data: CreateInventoryDto): Promise<InventoryDto> {
    let newInventory: Inventory | null = null

    try {
      const { productUuid, initialStock, stockMeasure } = data

      const existingInventory = await this.findOneInventory({ productUuid })

      if (existingInventory) {
        throw new UnprocessableEntityException('Inventory record already exists for this product')
      }

      const productId = await getIdAttribute(PRODUCT_REPOSITORY, productUuid)

      newInventory = await this.inventoryRepository.create({
        productId,
        stock: initialStock,
        stockMeasure,
      })

      await this.createInventoryTransaction({
        productUuid,
        quantity: initialStock,
        operation: TransactionOperation.ADD,
      })

      return plainToInstanceFunction(InventoryDto, newInventory) as InventoryDto
    } catch (error) {
      // Manual rollback: Delete the inventary if it was created
      if (newInventory) {
        this.logger.error('Rolling back created product:', newInventory.id)
        await newInventory.destroy()
      }
      this.logger.error(error)
      throw new NotFoundException('There was an error creating the inventory record for the product: ' + error.message)
    }
  }

  async findOneInventory(queryData: QueryOneInventoryDto): Promise<InventoryDto> {
    try {
      const { productUuid, uuid } = queryData

      const inventory = await this.inventoryRepository.findOne({
        where: { deletedAt: null, ...(uuid ? { uuid } : {}) },
        include: [
          {
            model: Product,
            where: { ...(productUuid ? { uuid: productUuid } : {}), deletedAt: null },
            attributes: ['uuid', 'name', 'price', 'description'],
          },
        ],
      })

      if (!inventory) {
        return null
      }

      return plainToInstanceFunction(InventoryDto, inventory) as InventoryDto
    } catch (error) {
      this.logger.error(error.message)
      throw new NotFoundException('Inventory record not found for the product')
    }
  }

  async updateInventory(data: UpdateInventoryDto): Promise<void> {
    try {
      const { productUuid, quantity, operation } = data

      const inventory = await this.findOneInventory({ productUuid })

      if (!inventory) {
        throw new NotFoundException('Inventory record not found')
      }

      let newStock: number

      if (operation === TransactionOperation.SUBTRACT) {
        if (inventory.stock < quantity) {
          throw new UnprocessableEntityException('Insufficient stock')
        }

        newStock = inventory.stock - quantity

        await this.createInventoryTransaction({ productUuid, quantity, operation })
      } else if (operation === TransactionOperation.ADD) {
        newStock = inventory.stock + quantity

        await this.createInventoryTransaction({ productUuid, quantity, operation })
      } else {
        throw new UnprocessableEntityException('Invalid transaction operation')
      }

      await this.inventoryRepository.update({ stock: newStock }, { where: { uuid: inventory.uuid } })
    } catch (error) {
      this.logger.error(error)
      throw new NotFoundException('Inventory record not found')
    }
  }

  private async createInventoryTransaction(data: UpdateInventoryDto): Promise<void> {
    let newTransaction: InventoryTransaction | null = null
    try {
      const { productUuid, quantity, operation } = data

      const productId = await getIdAttribute(PRODUCT_REPOSITORY, productUuid)

      newTransaction = await this.inventoryTransactionRepository.create({
        productId,
        quantity,
        operation,
      })

      //Simulate error to rollback TRXs
      //throw new Error('Test error')
    } catch (error) {
      // Manual rollback: Delete the transaction if it was created
      if (newTransaction) {
        this.logger.error('Rolling back created transaction:', newTransaction.id)
        await newTransaction.destroy()
      }
      this.logger.error(error)
      throw new NotFoundException('Inventory transaction not created')
    }
  }
}
