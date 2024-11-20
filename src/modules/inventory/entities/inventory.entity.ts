import { Product } from '@modules/product/entities/product.entity'
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  Index,
  Unique,
  Default,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript'
import { UnitOfMeasure } from '../interfaces/unit-mesure.enum'

@Table({ tableName: 'inventory' })
export class Inventory extends Model<Inventory> {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, autoIncrement: true })
  id: number

  @Unique
  @Column({ type: DataType.STRING, defaultValue: DataType.UUIDV4 })
  uuid: string

  @Column({ type: DataType.FLOAT, allowNull: false })
  stock: number

  @Column({ type: DataType.ENUM(...Object.values(UnitOfMeasure)), allowNull: false })
  stockMeasure: UnitOfMeasure

  @Column({ type: DataType.INTEGER, allowNull: false, field: 'product_id' })
  @ForeignKey(() => Product)
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
