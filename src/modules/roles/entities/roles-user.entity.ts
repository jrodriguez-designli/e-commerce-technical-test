import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, HasMany, ForeignKey } from 'sequelize-typescript'
import { User } from '@modules/user/entities/user.entity'
import { Role } from './roles.entity'

@Table({ tableName: 'roles_user' })
export class RoleUser extends Model<RoleUser> {
  @Column({ type: DataType.INTEGER })
  @ForeignKey(() => User)
  userId: number

  @Column({ type: DataType.INTEGER })
  @ForeignKey(() => Role)
  roleId: number

  @CreatedAt
  @Column({ type: DataType.DATE, field: 'created_at' })
  createdAt?: Date

  @UpdatedAt
  @Column({ type: DataType.DATE, field: 'updated_at' })
  updatedAt?: Date

  @Column({ type: DataType.DATE, allowNull: true, field: 'deleted_at' })
  deletedAt?: Date
}
