import {
  PRODUCT_REPOSITORY,
  PROFILE_REPOSITORY,
  ROLE_REPOSITORY,
  USER_REPOSITORY,
} from '@commons/constants/entities.constants'
import { Product } from '@modules/product/entities/product.entity'
import { Profile } from '@modules/profile/entities/profile.entity'
import { Role } from '@modules/roles/entities/roles.entity'
import { User } from '@modules/user/entities/user.entity'
import { Model, ModelStatic } from 'sequelize'

export const REPOSITORY_MAP: Record<string, ModelStatic<Model>> = {
  [USER_REPOSITORY]: User,
  [ROLE_REPOSITORY]: Role,
  [PROFILE_REPOSITORY]: Profile,
  [PRODUCT_REPOSITORY]: Product,
} as const

export type RepositoryTokenMap = typeof REPOSITORY_MAP

export type RepositoryToken = keyof RepositoryTokenMap
