import { Provider } from '@nestjs/common'
import { RoleService } from '../roles.service'
import { ROLES_SERVICE } from '@commons/constants/service.constants'

export const RolesServiceProvider: Provider = {
  provide: ROLES_SERVICE,
  useClass: RoleService,
}
