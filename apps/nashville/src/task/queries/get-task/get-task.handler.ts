import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTaskQuery } from './get-task.query';
import { TaskService } from '../../task.service';

@QueryHandler(GetTaskQuery)
export class GetTaskHandler implements IQueryHandler<GetTaskQuery> {
  constructor(private readonly taskService: TaskService) {}
  async execute({ getTaskDto }: GetTaskQuery) {
    return this.taskService.getTask(getTaskDto);
  }
}
