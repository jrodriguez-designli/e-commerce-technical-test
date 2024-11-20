export function transformToPlain<V extends { get: (options: { plain: boolean }) => any }>(
  entityOrEntities: V | V[],
): any | any[] {
  try {
    if (Array.isArray(entityOrEntities)) {
      // If it is an array, apply `get({ plain: true })` to each element
      return entityOrEntities.map((entity) => entity.get({ plain: true }))
    } else {
      // If it is an object, apply `get({ plain: true })` to it
      return entityOrEntities.get({ plain: true })
    }
  } catch (error) {
    throw new Error('An error occurred while transforming data to plain: ' + error.message)
  }
}
