import { Module } from '@nestjs/common'
import { ProfileController } from './profile.controller'
import { profileEntityProvider } from './entities/providers/profile.provider'
import { ProfileServiceProvider } from './providers/profile-service.provider'

@Module({
  controllers: [ProfileController],
  providers: [ProfileServiceProvider, ...profileEntityProvider],
  exports: [ProfileServiceProvider],
})
export class ProfileModule {}
