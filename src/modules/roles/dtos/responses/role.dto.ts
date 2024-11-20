import { Exclude, Expose, Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
import { UserDto } from '@modules/user/dto'

@Exclude()
export class RoleDto {
  @ApiProperty({
    description: 'The unique identifier for the role',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Expose()
  readonly uuid: string

  @ApiProperty({
    description: 'The name of the role',
    example: 'Admin',
  })
  @Expose()
  readonly name: string

  @ApiProperty({
    description: 'A brief description of the role',
    example: 'Administrator with full access rights',
  })
  @Expose()
  readonly description: string

  @ApiProperty({
    type: () => UserDto,
    isArray: true,
    description: 'A list of users associated with this role',
  })
  @Type(() => UserDto)
  @Expose()
  readonly users?: UserDto[]

  @ApiProperty({
    description: 'The date the role was created',
    example: '2024-11-19T12:34:56Z',
  })
  @Expose()
  readonly createdAt?: Date

  @ApiProperty({
    description: 'The date the role was last updated',
    example: '2024-11-19T12:34:56Z',
  })
  @Expose()
  readonly updatedAt?: Date
}
