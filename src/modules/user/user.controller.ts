import { Controller, Get, Post, Patch, Delete, Body, Param, Query, Inject } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger'
import { CreateUserDto, QueryAllUsersDto, QueryOneUserDto, UpdateUserDto, UserDto } from './dto'
import { IUserService } from './interfaces/user-service.interface'
import { USER_SERVICE } from '@commons/constants/service.constants'
import { RolesEnum } from '@modules/roles/interfaces/role.enum'
import { Roles } from '@modules/auth/decorators/roles.decorator'
import { Auth } from '@modules/auth/decorators/auth.decorator'

@ApiTags('Users') // Swagger tag for grouping endpoints under 'Users'
@Controller('user')
export class UserController {
  constructor(
    @Inject(USER_SERVICE)
    private readonly userService: IUserService,
  ) {}

  @Auth()
  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.', type: UserDto })
  @ApiResponse({ status: 409, description: 'User with this email already exists.' })
  @ApiResponse({ status: 422, description: 'An error occurred while creating the user.' })
  @Post('create')
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return await this.userService.create(createUserDto)
  }

  //@Auth()
  //@Roles(RolesEnum.ADMIN, RolesEnum.USER)
  @ApiOperation({ summary: 'Get all users with optional query parameters' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'offset', required: false, type: Number })
  @ApiQuery({ name: 'order', required: false, type: String })
  @ApiResponse({ status: 200, description: 'List of users returned successfully.', type: [UserDto] })
  @ApiResponse({ status: 422, description: 'An error occurred while fetching users.' })
  @Get('find-all')
  async findAll(@Query() queryParams: QueryAllUsersDto): Promise<UserDto[]> {
    return await this.userService.findAll(queryParams)
  }

  @Auth()
  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  @ApiOperation({ summary: 'Get a specific user by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the user to find', required: true })
  @ApiResponse({ status: 200, description: 'User found successfully.', type: UserDto })
  @ApiResponse({ status: 404, description: 'User with ID not found.' })
  @ApiResponse({ status: 422, description: 'An error occurred while fetching the user.' })
  @Get('find-one/:uuid')
  async findOne(@Param() queryParams: QueryOneUserDto): Promise<UserDto> {
    return await this.userService.findOne(queryParams)
  }

  @Auth()
  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  @ApiOperation({ summary: 'Update user information' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'User updated successfully.', type: UserDto })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 409, description: 'Another user with this email already exists.' })
  @ApiResponse({ status: 422, description: 'An error occurred while updating the user.' })
  @Patch('update')
  async update(@Body() updateUserDto: UpdateUserDto): Promise<UserDto> {
    return await this.userService.update(updateUserDto)
  }

  @Auth()
  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  @ApiOperation({ summary: 'Delete a user by UUID' })
  @ApiParam({ name: 'uuid', description: 'The UUID of the user to delete', required: true })
  @ApiResponse({ status: 204, description: 'User deleted successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 422, description: 'An error occurred while deleting the user.' })
  @Delete('delete/:uuid')
  async delete(@Param('uuid') uuid: string): Promise<void> {
    await this.userService.delete(uuid)
  }
}
