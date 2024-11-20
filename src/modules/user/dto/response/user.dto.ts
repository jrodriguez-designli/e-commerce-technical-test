import { Exclude, Expose } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
import { RoleDto } from '@modules/roles/dtos'

@Exclude()
export class UserDto {
  @ApiProperty({
    description: 'The unique identifier for the user',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Expose()
  readonly uuid: string

  @ApiProperty({
    description: 'The email address of the user',
    example: 'user@example.com',
  })
  @Expose()
  readonly email: string

  @ApiProperty({
    description: 'Role assigned to the user',
    example: '[{name: ADMIN}]',
  })
  @Expose()
  readonly roles: RoleDto[]

  @ApiProperty({
    description: 'The date the user was created',
    example: '2024-11-19T12:34:56Z',
  })
  @Expose()
  readonly createdAt: Date

  @ApiProperty({
    description: 'The date the user was last updated',
    example: '2024-11-19T12:34:56Z',
  })
  @Expose()
  readonly updatedAt: Date
}
