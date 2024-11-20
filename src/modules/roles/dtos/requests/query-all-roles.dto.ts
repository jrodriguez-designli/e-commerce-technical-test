import { PartialType } from '@nestjs/swagger'
import { PaginationDto } from '@commons/dtos/pagination-dto/pagination.dto'

export class QueryAllRoles extends PartialType(PaginationDto) {}
