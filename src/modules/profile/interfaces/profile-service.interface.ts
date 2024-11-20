import { CreateProfileDto, ProfileDto, QueryOneProfileDto, UpdateProfileDto, QueryAllProfilesDto } from '../dtos'

/**
 * Interface for creating a profile.
 */
export interface ICreateProfileService {
  /**
   * Creates a new profile.
   * @param data - The data required to create a profile.
   * @returns A promise that resolves to the created profile DTO.
   */
  create(data: CreateProfileDto): Promise<ProfileDto>
}

/**
 * Interface for finding all profiles with pagination.
 */
export interface IFindAllProfilesService {
  /**
   * Finds all profiles based on pagination parameters.
   * @param queryParams - The pagination and sorting parameters.
   * @returns A promise that resolves to a list of profile DTOs.
   */
  findAll(queryParams: QueryAllProfilesDto): Promise<ProfileDto[]>
}

/**
 * Interface for finding a profile by ID.
 */
export interface IFindOneProfileService {
  /**
   * Finds a profile by its UUID.
   * @param data - The data containing the UUID of the profile.
   * @returns A promise that resolves to the found profile DTO.
   */
  findOne(data: QueryOneProfileDto): Promise<ProfileDto>
}

/**
 * Interface for updating a profile.
 */
export interface IUpdateProfileService {
  /**
   * Updates an existing profile.
   * @param updateData - The data required to update the profile.
   * @returns A promise that resolves to the updated profile DTO.
   */
  update(updateData: UpdateProfileDto): Promise<ProfileDto>
}

/**
 * Interface for deleting a profile.
 */
export interface IDeleteProfileService {
  /**
   * Deletes a profile by marking it as deleted.
   * @param uuid - The UUID of the profile to delete.
   * @returns A promise that resolves to the deleted profile DTO.
   */
  delete(uuid: string): Promise<ProfileDto>
}

/**
 * Global interface that extends all profile-related operations.
 */
export interface IProfileService
  extends ICreateProfileService,
    IFindAllProfilesService,
    IFindOneProfileService,
    IUpdateProfileService,
    IDeleteProfileService {}
