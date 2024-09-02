/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "gallatin";

export interface Empty {
}

export interface PaginationDto {
  page: number;
  limit: number;
}

export interface UpdateTaskDto {
  id: string;
  parentId?: string | undefined;
  title?: string | undefined;
  description?: string | undefined;
}

export interface GetTaskDto {
  id: string;
}

export interface TasksDto {
  Tasks: TaskDto[];
  count: number;
}

export interface CreateTaskDto {
  parentId?: string | undefined;
  title: string;
  description: string;
}

export interface TaskDto {
  id: string;
  parent?: TaskDto | undefined;
  description: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export const GALLATIN_PACKAGE_NAME = "gallatin";

export interface TaskServiceClient {
  getTask(request: GetTaskDto): Observable<TaskDto>;

  getPaginatedTasksList(request: PaginationDto): Observable<TasksDto>;

  createTask(request: CreateTaskDto): Observable<TaskDto>;

  updateTask(request: UpdateTaskDto): Observable<TaskDto>;

  removeTask(request: GetTaskDto): Observable<Empty>;
}

export interface TaskServiceController {
  getTask(request: GetTaskDto): Promise<TaskDto> | Observable<TaskDto> | TaskDto;

  getPaginatedTasksList(request: PaginationDto): Promise<TasksDto> | Observable<TasksDto> | TasksDto;

  createTask(request: CreateTaskDto): Promise<TaskDto> | Observable<TaskDto> | TaskDto;

  updateTask(request: UpdateTaskDto): Promise<TaskDto> | Observable<TaskDto> | TaskDto;

  removeTask(request: GetTaskDto): Promise<Empty> | Observable<Empty> | Empty;
}

export function TaskServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getTask", "getPaginatedTasksList", "createTask", "updateTask", "removeTask"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("TaskService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("TaskService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const TASK_SERVICE_NAME = "TaskService";
