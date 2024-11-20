import { SetMetadata } from '@nestjs/common'
import { RolesEnum } from '@modules/roles/interfaces/role.enum'
import { RolesKey } from '@commons/constants/auth.constants'

export const Roles = (...roles: RolesEnum[]) => SetMetadata(RolesKey, roles)
