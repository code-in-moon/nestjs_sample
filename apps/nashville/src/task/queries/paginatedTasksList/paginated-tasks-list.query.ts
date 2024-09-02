import { PaginationDto } from '@app/common';

export class PaginatedTasksListQuery {
  constructor(public readonly paginationDto: PaginationDto) {}
}
