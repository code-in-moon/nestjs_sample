import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginatedTasksListQuery } from './paginated-tasks-list.query';
import { TaskService } from '../../task.service';

@QueryHandler(PaginatedTasksListQuery)
export class PaginatedTasksListHandler
  implements IQueryHandler<PaginatedTasksListQuery>
{
  constructor(private readonly taskService: TaskService) {}
  async execute({ paginationDto }: PaginatedTasksListQuery) {
    return this.taskService.getPaginatedTasksList(paginationDto);
  }
}
