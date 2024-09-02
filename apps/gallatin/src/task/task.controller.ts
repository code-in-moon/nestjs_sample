import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTaskCommand } from './commands/create-task/create-task.command';
import { UpdateTaskCommand } from './commands/update-task/update-task.command';
import { PaginatedTasksListQuery } from './queries/paginatedTasksList/paginated-tasks-list.query';
import { DeleteTaskCommand } from './commands/delete-task/delete-task.command';
import { GetTaskQuery } from './queries/get-task/get-task.query';
import {
  CreateTaskDto,
  GetTaskDto,
  PaginationDto,
  TasksDto,
  TaskServiceController,
  TaskServiceControllerMethods,
  UpdateTaskDto,
  TaskDto,
} from '@app/common';

@Controller()
@TaskServiceControllerMethods()
export class TaskController implements TaskServiceController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  getTask(getTaskDto: GetTaskDto) {
    return this.queryBus.execute<GetTaskQuery, TaskDto>(
      new GetTaskQuery(getTaskDto),
    );
  }
  // @GrpcMethod('TaskService', 'createTask')
  getPaginatedTasksList(paginationDto: PaginationDto) {
    return this.queryBus.execute<PaginatedTasksListQuery, TasksDto>(
      new PaginatedTasksListQuery(paginationDto),
    );
  }

  createTask(createTaskDto: CreateTaskDto) {
    return this.commandBus.execute<CreateTaskCommand, TaskDto>(
      new CreateTaskCommand(createTaskDto),
    );
  }

  updateTask(updateTaskDto: UpdateTaskDto) {
    return this.commandBus.execute<UpdateTaskCommand, TaskDto>(
      new UpdateTaskCommand(updateTaskDto),
    );
  }

  removeTask(getTaskDto: GetTaskDto) {
    console.log(getTaskDto);
    return this.commandBus.execute<DeleteTaskCommand, void>(
      new DeleteTaskCommand(getTaskDto),
    );
  }
}
