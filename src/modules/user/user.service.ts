import {
  Injectable,
  NotFoundException,
  ConflictException,
  Inject,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common'

import { USER_REPOSITORY } from '@commons/constants/entities.constants'
import { User } from './entities/user.entity'
import { CreateUserDto, QueryAllUsersDto, QueryOneUserDto, UpdateUserDto, UserDto } from './dto'
import { plainToInstanceFunction } from '@commons/providers/transform-data/plain-to-instance.dto'
import { IUserService } from './interfaces/user-service.interface'
import { Role } from '@modules/roles/entities/roles.entity'
import { EventEmitter2 } from '@nestjs/event-emitter'

@Injectable()
export class UserService implements IUserService {
  private readonly logger: Logger

  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: typeof User,

    private readonly eventEmitter: EventEmitter2,
  ) {
    this.logger = new Logger(UserService.name)
  }

  async create(data: CreateUserDto): Promise<UserDto> {
    try {
      const { email } = data

      const existingUser = await this.userRepository.findOne({ where: { email, deletedAt: null } })

      if (existingUser) {
        throw new ConflictException('User with this email already exists')
      }

      const createUser = await this.userRepository.create({ email })

      this.eventEmitter.emit('Role.assignRoleUser', { userUuid: createUser.uuid })

      return plainToInstanceFunction(UserDto, createUser) as UserDto
    } catch (error) {
      this.logger.error(error)
      throw new UnprocessableEntityException('An error occurred while creating the user: ' + error.message)
    }
  }

  async findAll(queryParams: QueryAllUsersDto): Promise<UserDto[]> {
    try {
      const { limit, offset, order } = queryParams

      console.log('order', queryParams)

      const whereCondition = {
        deletedAt: null,
      }

      const users = await this.userRepository.findAll({
        limit,
        offset,
        where: { ...whereCondition },
        include: [
          {
            model: Role,
            as: 'roles',
            attributes: ['name'],
            through: { attributes: [] },
          },
        ],
      })

      return plainToInstanceFunction(UserDto, users) as UserDto[]
    } catch (error) {
      this.logger.error(error)
      throw new UnprocessableEntityException('An error occurred while fetching users: ' + error.message)
    }
  }

  async findOne(queryParams: QueryOneUserDto): Promise<UserDto> {
    try {
      const whereCondition = {
        ...queryParams,
        deletedAt: null,
      }

      const user = await this.userRepository.findOne({
        where: { ...whereCondition },
        include: [
          {
            model: Role,
            as: 'roles',
            attributes: ['name'],
            through: { attributes: [] },
          },
        ],
      })

      if (!user) {
        return null
      }

      return plainToInstanceFunction(UserDto, user) as UserDto
    } catch (error) {
      this.logger.error(error)
      throw new UnprocessableEntityException('An error occurred while fetching user: ' + error.message)
    }
  }

  async update(updateUserDto: UpdateUserDto): Promise<UserDto> {
    try {
      const { uuid, ...rest } = updateUserDto

      const user = await this.userRepository.findOne({ where: { uuid, deletedAt: null } })

      if (rest.email) {
        const existingUser = await this.userRepository.findOne({ where: { email: updateUserDto.email } })

        if (existingUser && existingUser.uuid !== uuid) {
          throw new ConflictException('Another user with this email already exists')
        }
      }

      const userUpdated = await user.update({ ...rest })
      await userUpdated.save()

      return plainToInstanceFunction(UserDto, userUpdated) as UserDto
    } catch (error) {
      this.logger.error(error)
      throw new UnprocessableEntityException('An error occurred while updating the user: ' + error.message)
    }
  }

  async delete(uuid: string): Promise<void> {
    try {
      const user = await this.userRepository.findOne({ where: { uuid, deletedAt: null } })
      await user.destroy()
      await user.save()
    } catch (error) {
      this.logger.error(error)
      throw new UnprocessableEntityException('An error occurred while deleting the user: ' + error.message)
    }
  }
}
