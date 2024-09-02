import {
  BadRequestException,
  Body,
  Inject,
  Injectable,
  OnModuleInit,
  Param,
} from '@nestjs/common';
import {
  GALLATIN_PACKAGE_NAME,
  TASK_SERVICE_NAME,
  TaskServiceClient,
  GetTaskDto,
  CreateTaskDto,
  TaskDto,
  PaginationDto,
  TasksDto,
  UpdateTaskDto,
  Empty,
} from '@app/common';
import { ClientGrpc } from '@nestjs/microservices';
import { GALLATIN_SERVICE } from '../constant';
import { Observable } from 'rxjs';

@Injectable()
export class TaskService implements OnModuleInit {
  private taskServiceClient: TaskServiceClient;

  constructor(@Inject(GALLATIN_SERVICE) private client: ClientGrpc) {}

  onModuleInit() {
    this.taskServiceClient =
      this.client.getService<TaskServiceClient>(TASK_SERVICE_NAME);
  }

  getTask(getTaskDto: GetTaskDto) {
    return this.taskServiceClient.getTask(getTaskDto);
  }
  getPaginatedTasksList(paginationDto: PaginationDto) {
    return this.taskServiceClient.getPaginatedTasksList(paginationDto);
  }

  createTask(createTaskDto: CreateTaskDto) {
    return this.taskServiceClient.createTask(createTaskDto);
  }

  updateTask(updateTaskDto: UpdateTaskDto) {
    return this.taskServiceClient.updateTask(updateTaskDto);
  }
  removeTask(getTaskDto: GetTaskDto) {
    return this.taskServiceClient.removeTask(getTaskDto);
  }
}
