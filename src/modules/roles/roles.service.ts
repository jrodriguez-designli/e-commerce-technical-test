import { Inject, Injectable, Logger, UnprocessableEntityException } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'

import { CreateRoleDto, QueryAllRoles, QueryOneRole, RoleDto, UpdateRoleDto, UserRoleDto } from './dtos'
import { IRoleService } from './interfaces/roles-service.interface'

import { Role } from './entities/roles.entity'
import { User } from '@modules/user/entities/user.entity'
import { plainToInstanceFunction } from '@commons/providers/transform-data/plain-to-instance.dto'
import { ROLE_REPOSITORY, ROLES_USER_REPOSITORY, USER_REPOSITORY } from '@commons/constants/entities.constants'
import { RoleUser } from './entities/roles-user.entity'
import { getIdAttribute } from '@commons/providers/generic-entity-resolver/entity-id-attribute.provider'
import { OnEvent } from '@nestjs/event-emitter'

@Injectable()
export class RoleService implements IRoleService {
  private readonly logger: Logger

  constructor(
    @Inject(ROLE_REPOSITORY)
    private roleRepository: typeof Role,

    @Inject(ROLES_USER_REPOSITORY)
    private readonly roleUserRepository: typeof RoleUser,
  ) {
    this.logger = new Logger(RoleService.name)
  }

  async create(data: CreateRoleDto): Promise<RoleDto> {
    try {
      const roleExists = await this.roleRepository.findOne({ where: { name: data.name } })

      if (roleExists) {
        return plainToInstanceFunction(RoleDto, roleExists) as RoleDto
      }

      const role = await this.roleRepository.create({ ...data })

      return plainToInstanceFunction(RoleDto, role) as RoleDto
    } catch (error) {
      this.logger.error('There was an error creating roles: ' + error)
      throw new UnprocessableEntityException(error)
    }
  }

  async findAll(queryParams: QueryAllRoles): Promise<RoleDto[]> {
    try {
      const { limit, offset, order } = queryParams

      const roles = await this.roleRepository.findAll({
        limit,
        offset,
        order,
        include: [
          {
            model: User,
            attributes: ['email', 'uuid'],
          },
        ],
      })

      return plainToInstanceFunction(RoleDto, roles) as RoleDto[]
    } catch (error) {
      this.logger.error(error)
      throw new UnprocessableEntityException(error)
    }
  }

  async findOne(queryParams: QueryOneRole): Promise<RoleDto> {
    try {
      const whereConditions = { ...queryParams, deletedAt: null }

      const role = await this.roleRepository.findOne({
        where: whereConditions,
        include: [
          {
            model: User,
            attributes: ['email', 'uuid'],
          },
        ],
      })

      return plainToInstanceFunction(RoleDto, role) as RoleDto
    } catch (error) {
      this.logger.error(error)
      throw new UnprocessableEntityException(error)
    }
  }

  async update(updateData: UpdateRoleDto): Promise<RoleDto> {
    try {
      const { uuid, isDefault, ...updateRole } = updateData

      let role = await this.roleRepository.findOne({
        where: { uuid, deletedAt: null },
      })

      if (isDefault) {
        await this.setDefaultRole(uuid)
      }

      if (!role) {
        throw new UnprocessableEntityException('Role not found')
      }

      role = await role.update(updateRole)
      return plainToInstance(RoleDto, role.get({ plain: true }))
    } catch (error) {
      this.logger.error('Error updating Role: ' + error)
      throw new UnprocessableEntityException('Error updating role: ' + error.message)
    }
  }

  async delete(uuid: string): Promise<RoleDto> {
    try {
      const role = await this.roleRepository.findOne({
        where: { uuid, deletedAt: null },
      })

      if (!role) {
        throw new UnprocessableEntityException('Role not found')
      }

      role.deletedAt = new Date()

      const roleResponse = await role.save()

      return plainToInstance(RoleDto, roleResponse.get({ plain: true }))
    } catch (error) {
      this.logger.error(error)
      throw new UnprocessableEntityException(error)
    }
  }

  private async setDefaultRole(uuid: string): Promise<boolean> {
    try {
      await this.roleRepository.update(
        { isDefault: false },
        {
          where: { isDefault: true, deletedAt: null },
        },
      )

      await this.roleRepository.update(
        { isDefault: true },
        {
          where: { uuid },
        },
      )

      return true
    } catch (error) {
      this.logger.error(error)
      throw new UnprocessableEntityException(error)
    }
  }

  @OnEvent('Role.assignRoleUser', { async: true, promisify: true })
  async assignUserRole(data: UserRoleDto): Promise<void> {
    try {
      const { roleUuid, userUuid } = data

      let userId = await getIdAttribute(USER_REPOSITORY, userUuid)

      const { id: roleId } = await this.roleRepository.findOne({
        where: roleUuid ? { uuid: roleUuid } : { isDefault: true },
      })

      await this.roleUserRepository.create({ roleId, userId })
    } catch (error) {
      this.logger.error(error)
      throw new UnprocessableEntityException(error)
    }
  }
}
