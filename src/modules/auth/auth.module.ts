import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UserModule } from '../user/user.module'
import { JWT_EXPIRATION, JWT_SECRET, JWT_STRATEGY } from '@commons/constants/auth.constants'
import { BcryptProvider } from '@commons/providers/hasher/provider/bcrypt-provider.provider'
import { JwtStrategy } from './strategies/jwt.strategy'
import { AuthProvider } from './entities/providers/auth-entity.provider'
import { RestJwtAuthGuard } from './guards/rest-jwt-auth.guard'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: JWT_STRATEGY }),

    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIRATION },
    }),

    UserModule,
  ],
  providers: [AuthService, RestJwtAuthGuard, JwtStrategy, BcryptProvider, ...AuthProvider],
  controllers: [AuthController],
  exports: [PassportModule, JwtModule, RestJwtAuthGuard],
})
export class AuthModule {}
