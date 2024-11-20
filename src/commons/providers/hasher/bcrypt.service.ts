import * as bcrypt from 'bcrypt'
import { Injectable } from '@nestjs/common'
import { IHasher } from './interfaces/hasher.interface'
import { SALT_ROUNDS } from '@commons/constants/auth.constants'

@Injectable()
export class BcryptService implements IHasher {
  private readonly saltRounds = SALT_ROUNDS

  async hash(data: string): Promise<string> {
    return bcrypt.hash(data, this.saltRounds)
  }

  async compare(data: string, encrypted: string): Promise<boolean> {
    return bcrypt.compare(data, encrypted)
  }
}
