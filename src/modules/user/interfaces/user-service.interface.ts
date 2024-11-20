import { CreateUserDto, QueryAllUsersDto, QueryOneUserDto, UpdateUserDto, UserDto } from '../dto'

/**
 * Interface for user creation operations.
 */
export interface IUserCreationService {
  /**
   * Creates a new user.
   * @param data - Data required for creating the user.
   * @returns The created user as a DTO.
   */
  create(data: CreateUserDto): Promise<UserDto>
}

/**
 * Interface for user query operations.
 */
export interface IUserQueryService {
  /**
   * Finds all users based on given parameters.
   * @param queryParams - Optional query parameters.
   * @returns An array of users as DTOs.
   */
  findAll(queryParams: QueryAllUsersDto): Promise<UserDto[]>

  /**
   * Finds a specific user based on given parameters.
   * @param queryParams - Query parameters.
   * @returns The found user as a DTO.
   */
  findOne(queryParams: QueryOneUserDto): Promise<UserDto>
}

/**
 * Interface for user update operations.
 */
export interface IUserUpdateService {
  /**
   * Updates an existing user.
   * @param updateUserDto - Data required for updating the user.
   * @returns The updated user as a DTO.
   */
  update(updateUserDto: UpdateUserDto): Promise<UserDto>
}

/**
 * Interface for user deletion operations.
 */
export interface IUserDeletionService {
  /**
   * Deletes a user based on their UUID.
   * @param uuid - The UUID of the user to be deleted.
   */
  delete(uuid: string): Promise<void>
}

/**
 * Global interface combining all user service operations.
 */
export interface IUserService
  extends IUserCreationService,
    IUserQueryService,
    IUserUpdateService,
    IUserDeletionService {}
