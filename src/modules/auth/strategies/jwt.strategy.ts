import { JWT_SECRET } from '@commons/constants/auth.constants'
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
const dotenv = require('dotenv')
dotenv.config()
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    })
  }

  async validate(payload: any) {
    return { email: payload.email, sub: payload.sub }
  }
}
