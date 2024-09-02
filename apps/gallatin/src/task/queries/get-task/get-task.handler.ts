import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TaskDto } from '@app/common';
import { GetTaskQuery } from './get-task.query';
import { MysqlTask } from '../../Database/mysqlTask';

@QueryHandler(GetTaskQuery)
export class GetTaskHandler implements IQueryHandler<GetTaskQuery> {
  constructor(private readonly mysqlTask: MysqlTask) {}
  execute({ getTaskDto }: GetTaskQuery): Promise<TaskDto> {
    return this.mysqlTask.getTask(getTaskDto);
  }
}
