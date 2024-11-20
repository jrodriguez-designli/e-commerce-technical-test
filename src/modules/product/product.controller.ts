import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  Inject,
  Patch,
  SetMetadata,
} from '@nestjs/common'
import { CreateProductDto, QueryAllProductsDto, QueryOneProductDto, UpdateProductDto, ProductDto } from './dto'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { PRODUCT_SERVICE } from '@commons/constants/service.constants'
import { IProductService } from './interfaces/product-service.interface'
import { Roles } from '@modules/auth/decorators/roles.decorator'
import { RolesEnum } from '@modules/roles/interfaces/role.enum'
import { IS_PUBLIC } from '@commons/constants/auth.constants'

@ApiTags('products')
@Controller('product')
export class ProductController {
  constructor(
    @Inject(PRODUCT_SERVICE)
    private readonly productService: IProductService,
  ) {}
  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  @Post('create')
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The product has been successfully created.' })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY, description: 'Unprocessable entity.' })
  async create(@Body() createProductDto: CreateProductDto): Promise<ProductDto> {
    return await this.productService.create(createProductDto)
  }

  @SetMetadata(IS_PUBLIC, true)
  @Get('find-all')
  @ApiOperation({ summary: 'Retrieve all products' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Successfully retrieved products.' })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY, description: 'Unprocessable entity.' })
  async findAll(@Query() queryParams: QueryAllProductsDto): Promise<ProductDto[]> {
    return await this.productService.findAll(queryParams)
  }

  @SetMetadata(IS_PUBLIC, true)
  @Get('find-one/:uuid')
  @ApiOperation({ summary: 'Retrieve a specific product by UUID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Product retrieved successfully.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Product not found.' })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY, description: 'Unprocessable entity.' })
  async findOne(@Param() queryParams: QueryOneProductDto): Promise<ProductDto> {
    return await this.productService.findOne(queryParams)
  }

  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  @Patch('update')
  @ApiOperation({ summary: 'Update a product by UUID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The product has been successfully updated.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Product not found.' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Another product with this name already exists.' })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY, description: 'Unprocessable entity.' })
  async update(@Body() data: UpdateProductDto): Promise<ProductDto> {
    return await this.productService.update(data)
  }

  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  @Delete('delete/:uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a product by UUID' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'The product has been successfully deleted.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Product not found.' })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY, description: 'Unprocessable entity.' })
  async delete(@Param('uuid') uuid: string): Promise<void> {
    await this.productService.delete(uuid)
  }
}
