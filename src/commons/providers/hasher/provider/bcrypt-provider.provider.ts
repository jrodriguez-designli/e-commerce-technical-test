import { Provider } from '@nestjs/common'
import { IHasher } from '../interfaces/hasher.interface'
import { BcryptService } from '../bcrypt.service'
import { HASHER_SERVICE } from '@commons/constants/auth.constants'

export const BcryptProvider: Provider<IHasher> = {
  provide: HASHER_SERVICE,
  useClass: BcryptService,
}
