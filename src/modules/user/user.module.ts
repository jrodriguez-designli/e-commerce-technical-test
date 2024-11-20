import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { UserProvider } from './entities/providers/user-entity.provider'
import { UserServiceProvider } from './providers/user-service.provider'

@Module({
  providers: [UserServiceProvider, ...UserProvider],
  controllers: [UserController],
  exports: [UserServiceProvider],
})
export class UserModule {}
