import { SetMetadata } from '@nestjs/common'
import { RolesEnum } from '../interfaces/role.enum'
import { ROLES_KEY } from '@commons/constants/auth.constants'

export const Roles = (...roles: RolesEnum[]) => SetMetadata(ROLES_KEY, roles)
