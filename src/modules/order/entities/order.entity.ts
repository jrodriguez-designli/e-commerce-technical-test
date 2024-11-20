import { Product } from '@modules/product/entities/product.entity'
import { Profile } from '@modules/profile/entities/profile.entity'
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
import { OrderStatus } from '../interfaces/order-status.enum'

@Table({ tableName: 'orders' })
export class Order extends Model<Order> {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, autoIncrement: true })
  id: number

  @Index //Index is used to create a unique index in the database
  @Unique
  @Column({ type: DataType.STRING, defaultValue: DataType.UUIDV4 })
  uuid: string

  @Column({ type: DataType.INTEGER, allowNull: false, field: 'product_id' })
  @ForeignKey(() => Product)
  productId: number

  @BelongsTo(() => Product)
  product: Product

  @Column({ type: DataType.FLOAT, allowNull: false })
  productQuantity: number

  @Column({ type: DataType.FLOAT, allowNull: false })
  totalChargesAmount: number

  @Column({ type: DataType.ENUM(...Object.values(OrderStatus)), allowNull: false })
  status: OrderStatus

  @Column({ type: DataType.INTEGER, field: 'profile_id' })
  @ForeignKey(() => Profile)
  profileId?: number

  @BelongsTo(() => Profile)
  profile: Profile

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt?: Date

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt?: Date

  @Column({ type: DataType.DATE, allowNull: true, field: 'deleted_at' })
  deletedAt?: Date
}
