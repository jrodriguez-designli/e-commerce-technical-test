import { Model, FindOptions, ModelStatic } from 'sequelize'
import { Logger, NotFoundException } from '@nestjs/common'
import { REPOSITORY_MAP, RepositoryToken, RepositoryTokenMap } from './generic.repository-map.const'

const logger = new Logger('GenericAttributesService')

export async function getIdAttribute<Token extends RepositoryToken>(
  token: Token,
  uuid: string,
): Promise<Partial<InstanceType<RepositoryTokenMap[Token]>> | any> {
  const repository = REPOSITORY_MAP[token] as ModelStatic<Model<any, any>>

  if (!repository) {
    throw new NotFoundException(`Repository not found: ${token}`)
  }

  try {
    const { id: entityId } = await repository
      .findOne({
        where: { uuid },
        attributes: ['id'],
      })
      .then((data) => data?.get({ plain: true }))

    if (!entityId) {
      throw new NotFoundException(`Entity not found: ${token} with UUID: ${uuid}`)
    }

    return entityId as Partial<InstanceType<RepositoryTokenMap[Token]>>
  } catch (error) {
    logger.error(`Error fetching data from repository ${token}: ${error.message}`)
    return null
  }
}
