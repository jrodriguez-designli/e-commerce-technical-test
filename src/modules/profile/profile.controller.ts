import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  Logger,
  UnprocessableEntityException,
  Inject,
  Patch,
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger'
import { CreateProfileDto, ProfileDto, UpdateProfileDto, QueryOneProfileDto, QueryAllProfilesDto } from './dtos'
import { IProfileService } from './interfaces/profile-service.interface'
import { PROFILE_SERVICE } from '@commons/constants/service.constants'
import { Roles } from '@modules/auth/decorators/roles.decorator'
import { RolesEnum } from '@modules/roles/interfaces/role.enum'
import { Auth } from '@modules/auth/decorators/auth.decorator'

@ApiTags('Profiles')
@Controller('profile')
export class ProfileController {
  private readonly logger = new Logger(ProfileController.name)

  constructor(
    @Inject(PROFILE_SERVICE)
    private readonly profileService: IProfileService,
  ) {}

  @Auth()
  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  @ApiOperation({ summary: 'Create a new profile' })
  @ApiResponse({ status: 201, description: 'Profile successfully created', type: ProfileDto })
  @ApiResponse({ status: 422, description: 'Unprocessable Entity' })
  @ApiBody({ type: CreateProfileDto })
  @Post('create')
  async create(@Body() createProfileDto: CreateProfileDto): Promise<ProfileDto> {
    try {
      return await this.profileService.create(createProfileDto)
    } catch (error) {
      this.logger.error('Error creating profile: ', error)
      throw new UnprocessableEntityException('Error creating profile: ' + error.message)
    }
  }

  @Auth()
  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  @ApiOperation({ summary: 'Get all profiles with pagination' })
  @ApiResponse({ status: 200, description: 'List of profiles', type: [ProfileDto] })
  @ApiResponse({ status: 422, description: 'Unprocessable Entity' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Limit of profiles to return' })
  @ApiQuery({ name: 'offset', required: false, type: Number, description: 'Offset for pagination' })
  @ApiQuery({ name: 'order', required: false, type: String, description: 'Order of profiles' })
  @Get('find-all')
  async findAll(@Query() queryParams: QueryAllProfilesDto): Promise<ProfileDto[]> {
    try {
      return await this.profileService.findAll(queryParams)
    } catch (error) {
      this.logger.error('Error finding profiles: ', error)
      throw new UnprocessableEntityException('Error finding profiles: ' + error.message)
    }
  }

  @Auth()
  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  @ApiOperation({ summary: 'Get a profile by UUID' })
  @ApiResponse({ status: 200, description: 'Profile found', type: ProfileDto })
  @ApiResponse({ status: 422, description: 'Unprocessable Entity' })
  @ApiParam({ name: 'uuid', type: String, description: 'UUID of the profile' })
  @Get('find-one/:uuid')
  async findOne(@Param('uuid') uuid: string, @Query() query: QueryOneProfileDto): Promise<ProfileDto> {
    try {
      return await this.profileService.findOne({ uuid, ...query })
    } catch (error) {
      this.logger.error('Error finding profile: ', error)
      throw new UnprocessableEntityException('Error finding profile: ' + error.message)
    }
  }

  @Auth()
  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  @ApiOperation({ summary: 'Update an existing profile' })
  @ApiResponse({ status: 200, description: 'Profile updated', type: ProfileDto })
  @ApiResponse({ status: 422, description: 'Unprocessable Entity' })
  @ApiBody({ type: UpdateProfileDto })
  @Patch('update')
  async update(@Body() updateProfileDto: UpdateProfileDto): Promise<ProfileDto> {
    try {
      return await this.profileService.update(updateProfileDto)
    } catch (error) {
      this.logger.error('Error updating profile: ', error)
      throw new UnprocessableEntityException('Error updating profile: ' + error.message)
    }
  }

  @Auth()
  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  @ApiOperation({ summary: 'Delete a profile by UUID' })
  @ApiResponse({ status: 200, description: 'Profile deleted', type: ProfileDto })
  @ApiResponse({ status: 422, description: 'Unprocessable Entity' })
  @ApiParam({ name: 'uuid', type: String, description: 'UUID of the profile to delete' })
  @Delete('delete/:uuid')
  async delete(@Param('uuid') uuid: string): Promise<ProfileDto> {
    try {
      return await this.profileService.delete(uuid)
    } catch (error) {
      this.logger.error('Error deleting profile: ', error)
      throw new UnprocessableEntityException('Error deleting profile: ' + error.message)
    }
  }
}
