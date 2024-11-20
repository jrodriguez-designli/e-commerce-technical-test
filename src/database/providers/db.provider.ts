import { Sequelize } from 'sequelize-typescript'
import { Dialect } from 'sequelize'
import { SEQUELIZE } from '@commons/constants/db.constants'
import { IDatabaseConfigAttributes } from './interfaces/db-config.interface'
//Entities
import { User } from '@modules/user/entities/user.entity'
import { Auth } from '@modules/auth/entities/auth.entity'
import { Role } from '@modules/roles/entities/roles.entity'
import { RoleUser } from '@modules/roles/entities/roles-user.entity'
import { Profile } from '@modules/profile/entities/profile.entity'
import { Product } from '@modules/product/entities/product.entity'
import { InventoryTransaction } from '@modules/inventory/entities/inventory-transaction.entity'
import { Inventory } from '@modules/inventory/entities/inventory.entity'
import { Order } from '@modules/order/entities/order.entity'

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      const config: IDatabaseConfigAttributes = {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        dialect: (process.env.DB_DIALECT as Dialect) || 'postgres',
        logging: false,
      }

      const sequelize = new Sequelize(config)

      sequelize.addModels([User, Auth, Role, RoleUser, Profile, Product, InventoryTransaction, Inventory, Order])

      await sequelize.sync()
      return sequelize
    },
  },
]
