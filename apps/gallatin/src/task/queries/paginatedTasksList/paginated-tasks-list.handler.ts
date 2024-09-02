import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginatedTasksListQuery } from './paginated-tasks-list.query';
import { TasksDto } from '@app/common';
import { MysqlTask } from '../../Database/mysqlTask';

@QueryHandler(PaginatedTasksListQuery)
export class PaginatedTasksListHandler
  implements IQueryHandler<PaginatedTasksListQuery>
{
  constructor(private readonly mysqlTask: MysqlTask) {}
  execute({ paginationDto }: PaginatedTasksListQuery): Promise<TasksDto> {
    return this.mysqlTask.getPaginatedTasksList(paginationDto);
  }
}
