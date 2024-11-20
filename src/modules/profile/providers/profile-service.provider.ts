import { Provider } from '@nestjs/common'
import { ProfileService } from '../profile.service'
import { PROFILE_SERVICE } from '@commons/constants/service.constants'

export const ProfileServiceProvider: Provider = {
  provide: PROFILE_SERVICE,
  useClass: ProfileService,
}
