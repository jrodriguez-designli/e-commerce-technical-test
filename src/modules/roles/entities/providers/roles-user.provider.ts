import { ROLES_USER_REPOSITORY } from 'src/commons/constants/entities.constants'
import { RoleUser } from '../roles-user.entity'

export const roleUserProvider = [
  {
    provide: ROLES_USER_REPOSITORY,
    useValue: RoleUser,
  },
]
