import { ExecutionContext, Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { Cache } from 'cache-manager'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { ModuleRef, Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { IUserService } from '@modules/user/interfaces/user-service.interface'
import { USER_SERVICE } from '@commons/constants/service.constants'

@Injectable()
export class RestJwtAuthGuard extends AuthGuard('jwt') {
  private userService: IUserService
  private readonly logger = new Logger(RestJwtAuthGuard.name)

  constructor(
    private moduleRef: ModuleRef,
    private reflector: Reflector,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    super(reflector)
  }

  async onModuleInit() {
    this.userService = this.moduleRef.get(USER_SERVICE, { strict: false })
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler())

    if (isPublic) {
      return true
    }

    const canActivate = (await super.canActivate(context)) as boolean
    if (!canActivate) return false

    const request = context.switchToHttp().getRequest()
    const userPayload = request.user
    const cacheKey = `user-${userPayload.sub}`
    const cachedUser = await this.cacheManager.get(cacheKey)

    if (cachedUser) {
      request.user = cachedUser
      return true
    }

    try {
      const user = await this.userService.findOne({ uuid: userPayload.sub })

      const timeCache = 60 * 60 * 60 * 7 // Time to cache in mseconds -- 30 minutes

      await this.cacheManager.set(cacheKey, user, timeCache)
      request.user = user

      return true
    } catch (error) {
      this.logger.error('Error verifying user authenticy.', error)
      throw new UnauthorizedException('Error verifying user authenticy.')
    }
  }
}
