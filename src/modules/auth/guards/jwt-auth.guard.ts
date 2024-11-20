import { JWT_STRATEGY } from '@commons/constants/auth.constants'
import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtAuthGuard extends AuthGuard(JWT_STRATEGY) {}
