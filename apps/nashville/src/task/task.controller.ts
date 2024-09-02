import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseFilters,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTaskCommand } from './commands/create-task/create-task.command';
import { UpdateTaskCommand } from './commands/update-task/update-task.command';
import { PaginatedTasksListQuery } from './queries/paginatedTasksList/paginated-tasks-list.query';
import { DeleteTaskCommand } from './commands/delete-task/delete-task.command';
import { GetTaskQuery } from './queries/get-task/get-task.query';
import { CreateTaskDto, TaskDto, UpdateTaskDto } from '@app/common';
import { TaskService } from './task.service';
import { RpcException } from '@nestjs/microservices';
import { RpcExceptionFilter } from '../exceptionFilter';
import { UpdateRequestDto } from './requsetsDto/update-request.dto';
import { CreateRequestDto } from './requsetsDto/create-request.dto';

@Controller('task')
export class TaskController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly taskService: TaskService,
  ) {}

  @Get(':id')
  getTask(@Param('id') taskId: string) {
    try {
      return this.queryBus.execute<GetTaskQuery, TaskDto>(
        new GetTaskQuery({ id: taskId }),
      );
    } catch (err) {
      return err;
    }
  }
  @Get()
  getPaginatedTasksList(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    return this.queryBus.execute<PaginatedTasksListQuery, TaskDto[]>(
      new PaginatedTasksListQuery({ page: +page, limit: +limit }),
    );
  }

  @Post()
  createTask(@Body() createTaskRequest: CreateRequestDto) {
    return this.commandBus.execute<CreateTaskCommand, TaskDto>(
      new CreateTaskCommand(createTaskRequest),
    );
  }

  @Patch(':id')
  updateTask(
    @Param('id') taskId: string,
    @Body() updateTaskRequest: UpdateRequestDto,
  ) {
    return this.commandBus.execute<UpdateTaskCommand, TaskDto>(
      new UpdateTaskCommand({ id: taskId, ...updateTaskRequest }),
    );
  }

  @Delete(':id')
  removeTask(@Param('id') taskId: string) {
    return this.commandBus.execute<DeleteTaskCommand, void>(
      new DeleteTaskCommand({ id: taskId }),
    );
  }
}
