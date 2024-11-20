import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
  Index,
} from 'sequelize-typescript'
import { Product } from '@modules/product/entities/product.entity'
import { TransactionOperation } from '../interfaces/transaction-operation.enum'

@Table({ tableName: 'inventory_transactions', timestamps: true })
export class InventoryTransaction extends Model<InventoryTransaction> {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id: number

  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, unique: true })
  uuid: string

  @Column({ type: DataType.INTEGER, allowNull: false })
  quantity: number

  @Column({ type: DataType.ENUM(...Object.values(TransactionOperation)), allowNull: false })
  operation: TransactionOperation

  @Index //Index is used to create a unique index in the database
  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER, allowNull: false })
  productId: number

  @BelongsTo(() => Product)
  product: Product

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt?: Date

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt?: Date

  @Column({ type: DataType.DATE, allowNull: true, field: 'deleted_at' })
  deletedAt?: Date
}
