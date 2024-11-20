import { RoleUser } from '@modules/roles/entities/roles-user.entity'
import { Role } from '@modules/roles/entities/roles.entity'
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  Index,
  Unique,
  BelongsToMany,
} from 'sequelize-typescript'

@Table({
  tableName: 'users',
  timestamps: true,
  paranoid: true,
})
export class User extends Model<User> {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, autoIncrement: true })
  id: number

  @Index
  @Unique
  @Column({ type: DataType.STRING, defaultValue: DataType.UUIDV4 })
  uuid: string

  @Index({ unique: true })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string

  @BelongsToMany(() => Role, {
    through: () => RoleUser,
    foreignKey: 'userId',
    targetKey: 'id',
  })
  roles: Role[]

  @CreatedAt
  @Column({
    type: DataType.DATE,
    field: 'created_at',
  })
  createdAt: Date

  @UpdatedAt
  @Column({
    type: DataType.DATE,
    field: 'updated_at',
  })
  updatedAt: Date

  @DeletedAt
  @Column({
    type: DataType.DATE,
    field: 'deleted_at',
  })
  deletedAt: Date
}
