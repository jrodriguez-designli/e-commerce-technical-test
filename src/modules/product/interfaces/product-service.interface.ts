import {
  CreateProductDto,
  QueryAllProductsDto,
  QueryOneProductDto,
  UpdateProductDto,
  ProductDto,
  CalculateChargesDto,
} from '../dto'

/**
 * Interface for product creation operations.
 */
export interface IProductCreationService {
  /**
   * Creates a new product.
   * @param data - Data required for creating the product.
   * @returns The created product as a DTO.
   */
  create(data: CreateProductDto): Promise<ProductDto>
}

/**
 * Interface for product query operations.
 */
export interface IProductQueryService {
  /**
   * Finds all products based on given parameters.
   * @param queryParams - Optional query parameters.
   * @returns An array of products as DTOs.
   */
  findAll(queryParams: QueryAllProductsDto): Promise<ProductDto[]>

  /**
   * Finds a specific product based on given parameters.
   * @param queryParams - Query parameters.
   * @returns The found product as a DTO.
   */
  findOne(queryParams: QueryOneProductDto): Promise<ProductDto>
}

/**
 * Interface for product update operations.
 */
export interface IProductUpdateService {
  /**
   * Updates an existing product.
   * @param updateProductDto - Data required for updating the product.
   * @returns The updated product as a DTO.
   */
  update(updateProductDto: UpdateProductDto): Promise<ProductDto>
}

/**
 * Interface for product deletion operations.
 */
export interface IProductDeletionService {
  /**
   * Deletes a product based on its UUID.
   * @param uuid - The UUID of the product to be deleted.
   */
  delete(uuid: string): Promise<void>
}

/**
 * Interface to calculate total amount for products.
 */
export interface IProductTotalAmountService {
  /**
   * Calculates the total amount of products based on given parameters.
   * @param queryParams - Query parameters.
   * @returns The total amount of products.
   */
  calculateProductCharges(queryParams: CalculateChargesDto): Promise<number>
}

/**
 * Global interface combining all product service operations.
 */
export interface IProductService
  extends IProductCreationService,
    IProductQueryService,
    IProductUpdateService,
    IProductDeletionService,
    IProductTotalAmountService {}
