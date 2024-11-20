import { Exclude, Expose, Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
import { UserDto } from '@modules/user/dto'

@Exclude()
export class ProfileDto {
  @Expose()
  @ApiProperty({
    description: 'Unique identifier uuid',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  readonly uuid: string

  @Expose()
  @ApiProperty({
    description: 'First name of the individual associated with the profile',
    example: 'John',
  })
  readonly firstName: string

  @Expose()
  @ApiProperty({
    description: 'Last name of the individual associated with the profile',
    example: 'Doe',
  })
  readonly lastName: string

  @Expose()
  @ApiProperty({
    description: 'Full name of the individual associated with the profile',
    example: 'John Doe',
  })
  readonly fullName: string

  @Expose()
  @ApiProperty({
    description: 'User associated with the profile, showing only email and uuid',
    type: 'object',
    properties: {
      uuid: {
        type: 'string',
        example: '123e4567-e89b-12d3-a456-426614174000',
      },
      email: {
        type: 'string',
        example: 'example@domain.com',
      },
    },
  })
  @Type(() => UserDto)
  readonly user: UserDto

  @Expose()
  @ApiProperty({
    description: 'Timestamp of when this was created',
    type: Date,
    example: '2024-05-01T00:00:00Z',
  })
  readonly createdAt?: Date

  @Expose()
  @ApiProperty({
    description: 'Timestamp of the last update',
    type: Date,
    example: '2024-05-02T00:00:00Z',
  })
  readonly updatedAt?: Date
}
