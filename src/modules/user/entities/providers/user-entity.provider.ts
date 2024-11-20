import { USER_REPOSITORY } from '@commons/constants/entities.constants'
import { User } from '../user.entity'

export const UserProvider = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
]
