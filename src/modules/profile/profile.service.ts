import { Inject, Injectable, Logger, UnprocessableEntityException } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'

import { CreateProfileDto, ProfileDto, QueryOneProfileDto, UpdateProfileDto, QueryAllProfilesDto } from './dtos'

import { PROFILE_REPOSITORY, USER_REPOSITORY } from 'src/commons/constants/entities.constants'
import { Profile } from './entities/profile.entity'
import { LazyModuleLoader } from '@nestjs/core'
import { getIdAttribute } from '@commons/providers/generic-entity-resolver/entity-id-attribute.provider'
import { plainToInstanceFunction } from '@commons/providers/transform-data/plain-to-instance.dto'
import { User } from '@modules/user/entities/user.entity'
import { IProfileService } from './interfaces/profile-service.interface'

@Injectable()
export class ProfileService implements IProfileService {
  private readonly logger: Logger

  constructor(
    @Inject(PROFILE_REPOSITORY)
    private profileRepository: typeof Profile,

    private readonly lazyModuleLoader: LazyModuleLoader,
  ) {
    this.logger = new Logger(ProfileService.name)
  }

  async create(data: CreateProfileDto): Promise<ProfileDto> {
    try {
      const { userUuid, ...dataProfile } = data

      const userId = await getIdAttribute(USER_REPOSITORY, userUuid)

      const existingProfile = await this.profileRepository.findOne({
        where: { userId, deletedAt: null },
      })

      if (existingProfile) {
        throw new Error('Profile already exists, please update it instead')
      }

      const fullName = `${dataProfile.firstName} ${dataProfile.lastName}`

      const profile = await this.profileRepository.create({
        ...dataProfile,
        fullName,
        userId,
      })

      return plainToInstanceFunction(ProfileDto, profile) as ProfileDto
    } catch (error) {
      this.logger.error(error)
      throw new UnprocessableEntityException(error)
    }
  }

  async findAll(queryParams: QueryAllProfilesDto): Promise<ProfileDto[]> {
    try {
      const { limit, offset, order } = queryParams

      const profiles = await this.profileRepository.findAll({
        limit,
        offset,
        order,
        where: { deletedAt: null },
        include: [
          {
            model: User,
            attributes: ['uuid', 'email'],
          },
        ],
      })

      return plainToInstanceFunction(ProfileDto, profiles) as ProfileDto[]
    } catch (error) {
      this.logger.error(error)
      throw new UnprocessableEntityException(error)
    }
  }

  async findOne(data: QueryOneProfileDto): Promise<ProfileDto> {
    try {
      const { uuid } = data

      const profile = await this.profileRepository.findOne({
        where: {
          uuid,
          deletedAt: null,
        },
        include: [
          {
            model: User,
            attributes: ['email', 'uuid'],
          },
        ],
      })

      if (!profile) {
        throw new UnprocessableEntityException('Profile not found')
      }

      return plainToInstanceFunction(ProfileDto, profile) as ProfileDto
    } catch (error) {
      this.logger.error(error)
      throw new UnprocessableEntityException(error)
    }
  }

  async update(updateData: UpdateProfileDto): Promise<ProfileDto> {
    try {
      const { uuid, firstName, lastName, ...data } = updateData

      const profile = await this.profileRepository.findOne({
        where: { uuid, deletedAt: null },
      })

      if (!profile) {
        throw new UnprocessableEntityException('Profile not found')
      }

      if (firstName || lastName) {
        const newFirstName = firstName || profile.firstName
        const newLastName = lastName || profile.lastName
        profile.fullName = `${newFirstName} ${newLastName}`
      }

      const updateprofile = await profile.update(data)
      updateprofile.save()

      return plainToInstanceFunction(ProfileDto, updateprofile) as ProfileDto
    } catch (error) {
      this.logger.error('Error updating user: ' + error)
      throw new UnprocessableEntityException('Error updating profile: ' + error)
    }
  }

  async delete(uuid: string): Promise<ProfileDto> {
    try {
      const profile = await this.profileRepository.findOne({
        where: { uuid, deletedAt: null },
      })

      if (!profile) {
        throw new UnprocessableEntityException('Profile not found')
      }

      profile.deletedAt = new Date()

      const deletedProfile = await profile.save()

      return plainToInstance(ProfileDto, deletedProfile.get({ plain: true }))
    } catch (error) {
      this.logger.error(error)
      throw new UnprocessableEntityException(error)
    }
  }
}
