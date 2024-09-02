import {
  CreateTaskDto,
  Empty,
  GetTaskDto,
  PaginationDto,
  TaskDto,
  TasksDto,
  UpdateTaskDto,
} from '@app/common';

export interface ITaskDB {
  getTask(request: GetTaskDto): TaskDto;

  getPaginatedTasksList(request: PaginationDto): TasksDto;

  createTask(request: CreateTaskDto): TaskDto;

  updateTask(request: UpdateTaskDto): TaskDto;

  removeTask(request: GetTaskDto): Empty;
}
