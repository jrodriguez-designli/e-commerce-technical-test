import { Controller, Post, Get, Delete, Body, Param, Query, Patch, Inject } from '@nestjs/common'
import { ApiTags, ApiCreatedResponse, ApiResponse } from '@nestjs/swagger'

import { CreateRoleDto, QueryAllRoles, QueryOneRole, RoleDto, UpdateRoleDto, UserRoleDto } from './dtos'
import { SetDefaultDto } from './dtos/requests/set-default.dto'
import { IRoleService } from './interfaces/roles-service.interface'
import { RolesEnum } from './interfaces/role.enum'
import { ROLES_SERVICE } from '@commons/constants/service.constants'
import { Roles } from './decorators/roles.decorator'
import { ROLES_USER_REPOSITORY } from '@commons/constants/entities.constants'
import { RoleUser } from './entities/roles-user.entity'

@Roles(RolesEnum.ADMIN)
@ApiTags('roles')
@Controller('roles')
export class RoleController {
  constructor(
    @Inject(ROLES_SERVICE)
    private readonly roleService: IRoleService,
  ) {}

  @Post('/create')
  async createRole(@Body() createRoleDto: CreateRoleDto): Promise<RoleDto> {
    return this.roleService.create(createRoleDto)
  }

  @Get('find-all')
  async getAllRoles(@Query() queryParams: QueryAllRoles): Promise<RoleDto[]> {
    return this.roleService.findAll(queryParams)
  }

  @Get('find-one/:uuid')
  async getOneRole(@Query() data: QueryOneRole): Promise<RoleDto> {
    return this.roleService.findOne(data)
  }

  @Patch('update')
  async updateRole(@Body() updateRoleDto: UpdateRoleDto): Promise<RoleDto> {
    return this.roleService.update(updateRoleDto)
  }

  @Delete(':uuid')
  async deleteRole(@Param('uuid') uuid: string): Promise<RoleDto> {
    return await this.roleService.delete(uuid)
  }

  @Post('assign-user-role')
  async assignUserRole(@Body() data: UserRoleDto): Promise<void> {
    await this.roleService.assignUserRole(data)
  }
}
