import { Injectable, CanActivate, ExecutionContext, Logger, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { RolesEnum } from '@modules/roles/interfaces/role.enum'
import { RolesKey } from '@commons/constants/auth.constants'

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name)

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()

    const requiredRoles = this.reflector.getAllAndOverride<RolesEnum[]>(RolesKey, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!requiredRoles) {
      return true
    }

    const userRoles = request.user?.roles || []

    const userRoleNames = userRoles.map((role) => role.name)

    const hasRole = requiredRoles.some((role) => userRoleNames.includes(role))

    if (!hasRole) {
      this.logger.error('Unauthorized roles')
      throw new UnauthorizedException('Not permissions found.')
    }

    return true
  }
}
