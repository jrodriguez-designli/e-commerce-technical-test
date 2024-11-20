import { AUTH_REPOSITORY } from '@commons/constants/entities.constants'
import { Auth } from '../auth.entity'

export const AuthProvider = [
  {
    provide: AUTH_REPOSITORY,
    useValue: Auth,
  },
]
