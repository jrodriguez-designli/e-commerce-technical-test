import { Controller, Post, Body, HttpCode, HttpStatus, Logger, Get } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { AccessDto, AuthRequestDto } from './dto'

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name)

  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: AuthRequestDto })
  @ApiResponse({ status: 201, description: 'User registered successfully', type: AccessDto })
  @ApiResponse({ status: 409, description: 'User already exists, try with another email' })
  @ApiResponse({ status: 422, description: 'An error occurred while registering the user' })
  @Post('register')
  async register(@Body() authRequestDto: AuthRequestDto): Promise<AccessDto> {
    return this.authService.register(authRequestDto)
  }

  @ApiOperation({ summary: 'Log in a user' })
  @ApiBody({ type: AuthRequestDto })
  @ApiResponse({ status: 200, description: 'User logged in successfully', type: AccessDto })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @ApiResponse({ status: 422, description: 'An error occurred while logging in the user' })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() authRequestDto: AuthRequestDto): Promise<AccessDto> {
    return this.authService.login(authRequestDto)
  }

  @ApiOperation({ summary: 'Log in a user' })
  @ApiBody({ type: AuthRequestDto })
  @ApiResponse({ status: 200, description: 'User logged in successfully', type: AccessDto })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @ApiResponse({ status: 422, description: 'An error occurred while logging in the user' })
  @Get('test')
  async test(): Promise<string> {
    return 'test'
  }
}
