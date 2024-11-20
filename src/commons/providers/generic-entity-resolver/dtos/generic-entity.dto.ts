import { IsArray, IsOptional, IsString } from 'class-validator'
import { Type } from 'class-transformer'
import { FindOptions } from 'sequelize'
import { RepositoryToken } from '../generic.repository-map.const'

export class GenericAttributesDto<Token extends RepositoryToken> {
  @IsString()
  token: Token

  @IsString()
  uuid: string

  @IsArray()
  @IsOptional()
  @Type(() => String)
  attributes?: string[] = ['id'] // Default attribute set directly

  @IsOptional()
  include?: FindOptions['include'] // Optional include options
}
