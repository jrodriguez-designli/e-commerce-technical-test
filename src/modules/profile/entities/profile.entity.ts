import { User } from '@modules/user/entities/user.entity'
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Unique,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript'

@Table({ tableName: 'profiles' })
export class Profile extends Model<Profile> {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, autoIncrement: true })
  id: number

  @Unique
  @Column({ type: DataType.STRING, defaultValue: DataType.UUIDV4 })
  uuid: string

  @Column({ type: DataType.STRING, field: 'first_name' })
  firstName: string

  @Column({ type: DataType.STRING, field: 'last_name' })
  lastName: string

  @Column({ type: DataType.STRING, field: 'full_name' })
  fullName: string

  @Column({ type: DataType.INTEGER, field: 'user_id', allowNull: true })
  @ForeignKey(() => User)
  userId?: number

  @BelongsTo(() => User)
  user: User

  // @HasMany(() => Product)
  // products: Product[]

  // @HasMany(() => Order)
  // orders: Order[]

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt?: Date

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt?: Date

  @Column({ type: DataType.DATE, allowNull: true, field: 'deleted_at' })
  deletedAt?: Date
}
