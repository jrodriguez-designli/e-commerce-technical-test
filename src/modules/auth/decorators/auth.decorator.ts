import { applyDecorators, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { RestJwtAuthGuard } from '../guards/rest-jwt-auth.guard'
import { RolesGuard } from '../guards/role.guard'

export function Auth() {
  return applyDecorators(UseGuards(RestJwtAuthGuard, RolesGuard))
}
