import { Controller, Post, Get, Delete, Body, Param, Query, Patch, Inject } from '@nestjs/common'
import { ApiTags, ApiCreatedResponse, ApiResponse } from '@nestjs/swagger'

import { CreateRoleDto, QueryAllRoles, QueryOneRole, RoleDto, UpdateRoleDto, UserRoleDto } from './dtos'
import { IRoleService } from './interfaces/roles-service.interface'
import { RolesEnum } from './interfaces/role.enum'
import { ROLES_SERVICE } from '@commons/constants/service.constants'
import { Roles } from './decorators/roles.decorator'
import { Auth } from '@modules/auth/decorators/auth.decorator'

@Roles(RolesEnum.ADMIN)
@ApiTags('roles')
@Controller('roles')
export class RoleController {
  constructor(
    @Inject(ROLES_SERVICE)
    private readonly roleService: IRoleService,
  ) {}

  @Auth()
  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  @Post('/create')
  async createRole(@Body() createRoleDto: CreateRoleDto): Promise<RoleDto> {
    return this.roleService.create(createRoleDto)
  }

  @Auth()
  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  @Get('find-all')
  async getAllRoles(@Query() queryParams: QueryAllRoles): Promise<RoleDto[]> {
    return this.roleService.findAll(queryParams)
  }

  @Auth()
  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  @Get('find-one/:uuid')
  async getOneRole(@Query() data: QueryOneRole): Promise<RoleDto> {
    return this.roleService.findOne(data)
  }

  @Auth()
  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  @Patch('update')
  async updateRole(@Body() updateRoleDto: UpdateRoleDto): Promise<RoleDto> {
    return this.roleService.update(updateRoleDto)
  }

  @Auth()
  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  @Delete(':uuid')
  async deleteRole(@Param('uuid') uuid: string): Promise<RoleDto> {
    return await this.roleService.delete(uuid)
  }

  @Auth()
  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  @Post('assign-user-role')
  async assignUserRole(@Body() data: UserRoleDto): Promise<void> {
    await this.roleService.assignUserRole(data)
  }
}
