import { PROFILE_REPOSITORY } from 'src/commons/constants/entities.constants'
import { Profile } from '../profile.entity'

export const profileEntityProvider = [
  {
    provide: PROFILE_REPOSITORY,
    useValue: Profile,
  },
]
