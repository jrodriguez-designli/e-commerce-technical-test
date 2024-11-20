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
} from 'sequelize-typescript'

@Table({
  tableName: 'auth',
  timestamps: true,
  paranoid: true,
})
export class Auth extends Model<Auth> {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, autoIncrement: true })
  id: number

  @Index //Index is used to create a unique index in the database
  @Unique
  @Column({ type: DataType.STRING, defaultValue: DataType.UUIDV4 })
  uuid: string

  @Index({ unique: true })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  userId: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  hashedPassword: string

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
