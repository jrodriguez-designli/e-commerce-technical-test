import { Provider } from '@nestjs/common'
import { USER_SERVICE } from '@commons/constants/service.constants'
import { UserService } from '../user.service'

export const UserServiceProvider: Provider = {
  provide: USER_SERVICE,
  useClass: UserService,
}
