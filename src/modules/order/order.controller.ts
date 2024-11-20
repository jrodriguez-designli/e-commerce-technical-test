import { Controller, Post, Get, Body, Param, Query, Inject } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger'
import { CreateOrderDto, OrderDto, QueryAllOrderDto, QueryOneOrderDto } from './dto'
import { OrderService } from './order.service'
import { ORDER_SERVICE } from '@commons/constants/service.constants'
import { Roles } from '@modules/auth/decorators/roles.decorator'
import { RolesEnum } from '@modules/roles/interfaces/role.enum'
import { Auth } from '@modules/auth/decorators/auth.decorator'

@ApiTags('Orders')
@Controller('order')
export class OrderController {
  constructor(
    @Inject(ORDER_SERVICE)
    private readonly orderService: OrderService,
  ) {}

  @Auth()
  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'Order successfully created', type: OrderDto })
  @ApiResponse({ status: 422, description: 'Unprocessable Entity' })
  @Post('create')
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<OrderDto> {
    return await this.orderService.createOrder(createOrderDto)
  }

  @Auth()
  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  @ApiOperation({ summary: 'Find an order by UUID' })
  @ApiResponse({ status: 200, description: 'Order found', type: OrderDto })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @ApiParam({ name: 'uuid', type: String, description: 'The UUID of the order' })
  @Get('find-one/:uuid')
  async findOneOrder(@Param() params: QueryOneOrderDto): Promise<OrderDto> {
    return await this.orderService.findOneOrder(params)
  }

  @Auth()
  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  @ApiOperation({ summary: 'Find all orders for a specific profile' })
  @ApiResponse({ status: 200, description: 'List of orders found', type: [OrderDto] })
  @ApiResponse({ status: 404, description: 'No orders found for the specified profile' })
  @ApiQuery({ name: 'profileUuid', type: String, required: true, description: 'The UUID of the profile' })
  @Get('find-all')
  async findAllOrders(@Query() queryData: QueryAllOrderDto): Promise<OrderDto[]> {
    return await this.orderService.findAllOrders(queryData)
  }
}
