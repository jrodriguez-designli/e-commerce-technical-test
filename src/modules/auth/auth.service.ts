import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  Logger,
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Inject } from '@nestjs/common'
import { HASHER_SERVICE } from '@commons/constants/auth.constants'
import { IHasher } from '@commons/providers/hasher/interfaces/hasher.interface'
import { USER_SERVICE } from '@commons/constants/service.constants'
import { IUserService } from '@modules/user/interfaces/user-service.interface'
import { AccessDto, AuthDto, AuthRequestDto, GenerateAccessTokenDto, HandlePasswordDto } from './dto'
import { AUTH_REPOSITORY } from '@commons/constants/entities.constants'
import { Auth } from './entities/auth.entity'
import { UserDto } from '@modules/user/dto'

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name)

  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly authRepository: typeof Auth,

    @Inject(USER_SERVICE)
    private readonly userService: IUserService,

    @Inject(HASHER_SERVICE)
    private readonly hasherService: IHasher,

    private readonly jwtService: JwtService,
  ) {}

  async register(data: AuthRequestDto): Promise<AccessDto> {
    const { email, password } = data

    try {
      const existingUser = await this.userService.findOne({ email })

      if (existingUser) {
        throw new ConflictException('User already exists, try with another email')
      }

      const newUser = await this.userService.create({ email })

      await this.handlePassword({ password, userId: newUser.uuid })

      return this.getAccessToken({ email, sub: newUser.uuid })
    } catch (error) {
      this.logger.error(`Error in register method: ${error.message}`, error.stack)
      throw new UnprocessableEntityException('An error occurred while registering the user')
    }
  }

  async login(data: AuthRequestDto): Promise<AccessDto> {
    try {
      const { email, password } = data

      const user = await this.userService.findOne({ email })

      if (!user) {
        throw new NotFoundException('User not found')
      }

      const isPasswordValid = await this.checkPassword({ password, userId: user.uuid })

      if (isPasswordValid) {
        return this.getAccessToken({ email, sub: user.uuid })
      } else {
        throw new UnauthorizedException('Invalid credentials')
      }
    } catch (error) {
      this.logger.error(`Error in login method: ${error.message}`)
      throw new UnprocessableEntityException('An error occurred while logging in the user: ' + error.message)
    }
  }

  private getAccessToken(payload: GenerateAccessTokenDto): AccessDto {
    try {
      const { email, sub } = payload
      const accessToken = this.jwtService.sign(payload)

      return { accessToken, sub, email }
    } catch (error) {
      this.logger.error(`Error in getAccessToken method: ${error.message}`, error.stack)
      throw new UnprocessableEntityException('An error occurred while generating the access token')
    }
  }

  private async handlePassword(data: HandlePasswordDto): Promise<void> {
    try {
      const { password, userId } = data

      const hashedPassword = await this.hasherService.hash(password)

      await this.authRepository.create({ hashedPassword, userId })
    } catch (error) {
      this.logger.error(`Error in handlePassword method: ${error.message}`, error.stack)
      throw new UnprocessableEntityException('An error occurred while creating the password')
    }
  }

  private async checkPassword(data: HandlePasswordDto): Promise<boolean> {
    try {
      const { password, userId } = data

      const authEntry = await this.authRepository.findOne({ where: { userId } })

      if (!authEntry) {
        throw new UnauthorizedException('Invalid credentials')
      }

      const isValid = await this.hasherService.compare(password, authEntry.hashedPassword)

      if (!isValid) {
        throw new UnauthorizedException('Invalid credentials')
      }

      return isValid
    } catch (error) {
      this.logger.error(`Error in checkPassword method: ${error.message}`, error.stack)
      throw new UnprocessableEntityException('An error occurred while validating the password')
    }
  }
}
