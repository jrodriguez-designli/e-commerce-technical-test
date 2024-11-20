import { Module } from '@nestjs/common'
import { roleProvider } from './entities/providers/roles.provider'
import { RoleController } from './roles.controller'
import { RolesServiceProvider } from './providers/roles-service.provider'
import { roleUserProvider } from './entities/providers/roles-user.provider'

@Module({
  controllers: [RoleController],
  providers: [RolesServiceProvider, ...roleProvider, ...roleUserProvider],
  exports: [RolesServiceProvider],
})
export class RolesModule {}
