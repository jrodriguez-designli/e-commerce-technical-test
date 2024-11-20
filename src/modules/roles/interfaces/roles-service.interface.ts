import { CreateRoleDto, QueryAllRoles, QueryOneRole, RoleDto, UpdateRoleDto, UserRoleDto } from '../dtos'

export interface IRoleService {
  /**
   * Creates a new role.
   * @param data - The data required to create a role.
   * @returns A promise that resolves with the created role DTO.
   */
  create(data: CreateRoleDto): Promise<RoleDto>

  /**
   * Finds all roles based on provided query parameters.
   * @param queryParams - The parameters for querying roles.
   * @returns A promise that resolves with an array of role DTOs.
   */
  findAll(queryParams: QueryAllRoles): Promise<RoleDto[]>

  /**
   * Finds a role by its UUID.
   * @param uuid - The UUID of the role to find.
   * @returns A promise that resolves with the found role DTO.
   */
  findOne(queryParams: QueryOneRole): Promise<RoleDto>

  /**
   * Updates an existing role.
   * @param updateData - The data required to update a role.
   * @returns A promise that resolves with the updated role DTO.
   */
  update(updateData: UpdateRoleDto): Promise<RoleDto>

  /**
   * Deletes a role by marking it as deleted.
   * @param uuid - The UUID of the role to delete.
   * @returns A promise that resolves with the deleted role DTO.
   */
  delete(uuid: string): Promise<RoleDto>

  /**
   * Assigns a role to a user.
   * @param data - The data required to assign a role to a user.
   * @returns A promise that resolves with the updated role DTO.
   */
  assignUserRole(data: UserRoleDto): Promise<void>
}
