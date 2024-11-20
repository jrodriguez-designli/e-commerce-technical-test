import { Inventory } from '@modules/inventory/entities/inventory.entity'
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
  HasMany,
  ForeignKey,
  BelongsTo,
  HasOne,
} from 'sequelize-typescript'

@Table({ tableName: 'products' })
export class Product extends Model<Product> {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, autoIncrement: true })
  id: number

  @Unique
  @Column({ type: DataType.STRING, defaultValue: DataType.UUIDV4 })
  uuid: string

  @Column({ type: DataType.STRING, allowNull: false })
  name: string

  @Column({ type: DataType.STRING, allowNull: false })
  description: string

  @Column({ type: DataType.FLOAT, allowNull: false })
  price: number

  @Column({ type: DataType.INTEGER, allowNull: true })
  stock: number

  @Column({ type: DataType.INTEGER, field: 'profile_id' })
  @ForeignKey(() => Profile)
  profileId?: number

  @BelongsTo(() => Profile)
  profile: Profile

  @HasOne(() => Inventory)
  inventory: Inventory

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt?: Date

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt?: Date

  @Column({ type: DataType.DATE, allowNull: true, field: 'deleted_at' })
  deletedAt?: Date
}
