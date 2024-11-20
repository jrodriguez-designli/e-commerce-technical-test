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
  HasMany,
  BelongsToMany,
  Index,
} from 'sequelize-typescript'
import { RoleUser } from './roles-user.entity'
import { RolesEnum } from '../interfaces/role.enum'

@Table({ tableName: 'roles' })
export class Role extends Model<Role> {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, autoIncrement: true })
  id: number

  @Index
  @Unique
  @Column({ type: DataType.STRING, defaultValue: DataType.UUIDV4 })
  uuid: string

  @Column({ type: DataType.ENUM(...Object.values(RolesEnum)), allowNull: false })
  name: RolesEnum

  @Column({ type: DataType.STRING, allowNull: true })
  description: string

  @Column({ type: DataType.BOOLEAN, defaultValue: false, field: 'is_default' })
  isDefault: boolean

  @BelongsToMany(() => User, {
    through: () => RoleUser,
    foreignKey: 'roleId',
    targetKey: 'id', // Usa uuid en lugar de id
  })
  roles: Role[]

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt?: Date

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt?: Date

  @Column({ type: DataType.DATE, allowNull: true, field: 'deleted_at' })
  deletedAt?: Date
}
