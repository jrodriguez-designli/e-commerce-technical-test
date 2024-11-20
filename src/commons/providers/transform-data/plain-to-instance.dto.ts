import { plainToInstance } from 'class-transformer'
import { transformToPlain } from './transform-to-plain.provider'

export function plainToInstanceFunction<T, V extends { get: (options: { plain: boolean }) => any }>(
  dtoClass: new (...args: any[]) => T,
  entityOrEntities: V | V[],
): T | T[] {
  try {
    // Convert to plain data
    const plainData = transformToPlain(entityOrEntities)

    // If array is returned, transform and return an array of DTO instances
    if (Array.isArray(plainData)) {
      return plainToInstance(dtoClass, plainData) as T[]
    }

    // If object is returned, transform and return a single DTO instance
    return plainToInstance(dtoClass, plainData) as T
  } catch (error) {
    throw new Error('An error occurred while transforming data to DTO: ' + error.message)
  }
}
