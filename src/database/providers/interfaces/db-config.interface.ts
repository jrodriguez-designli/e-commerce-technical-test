import { Dialect } from 'sequelize'

export interface IDatabaseConfigAttributes {
  username?: string
  password?: string
  database?: string
  host?: string
  port: number
  dialect: Dialect | undefined
  logging: boolean
  dialectOptions?: {
    ssl?: {
      require: boolean
      rejectUnauthorized: boolean
    }
  }
}
