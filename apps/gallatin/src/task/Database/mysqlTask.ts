import {
  CreateTaskDto,
  Empty,
  GetTaskDto,
  LoggerMessageType,
  PaginationDto,
  TaskDto,
  TasksDto,
  UpdateTaskDto,
} from '@app/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';
import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { AshlandLogEvent } from '../events/ashland-log/ashland-log.event';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class MysqlTask {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    private readonly eventBus: EventBus,
  ) {}
  async createTask(request: CreateTaskDto): Promise<TaskDto> {
    const newTask = new Task();
    newTask.description = request.description;
    newTask.title = request.title;
    if (request.parentId) {
      newTask.parent = await this.taskRepository.findOne({
        where: { id: request.parentId },
      });
    }
    const task = await this.taskRepository.save(newTask);
    this.eventBus.publish(
      new AshlandLogEvent({
        message: `A new task was created by id:  ${task.id}`,
        type: LoggerMessageType.LOG,
        component: 'MysqlTask',
        occurredAt: new Date().toString(),
        service: 'Gallatin',
      }),
    );

    return task;
  }

  async getPaginatedTasksList(request: PaginationDto): Promise<TasksDto> {
    const take = request.limit || 10;
    const skip = (request.page - 1) * take || 0;

    const [tasks, total] = await this.taskRepository.findAndCount({
      relations: { parent: true },
      order: { createdAt: 'DESC' },
      take: take,
      skip: skip,
    });
    this.eventBus.publish(
      new AshlandLogEvent({
        message: `request for pagination tasks page:  ${request.page} and limit : ${request.limit}`,
        type: LoggerMessageType.LOG,
        component: 'MysqlTask',
        occurredAt: new Date().toString(),
        service: 'Gallatin',
      }),
    );
    return { Tasks: tasks, count: total };
  }

  async getTask(request: GetTaskDto): Promise<TaskDto> {
    const task = await this.taskRepository.findOne({
      where: { id: request.id },
      relations: { parent: true },
    });
    if (!task) {
      throw new RpcException({
        code: 5,
        message: `Task with id of ${request.id} not found`,
      });
    }
    this.eventBus.publish(
      new AshlandLogEvent({
        message: `request for task by id ${task.id}`,
        type: LoggerMessageType.LOG,
        component: 'MysqlTask',
        occurredAt: new Date().toString(),
        service: 'Gallatin',
      }),
    );
    return task;
  }

  //
  async removeTask(request: GetTaskDto): Promise<Empty> {
    const task = await this.taskRepository.findOne({
      where: { id: request.id },
      relations: { parent: true },
    });
    if (!task) {
      throw new RpcException({
        code: 5,
        message: `Task with id of ${request.id} not found`,
      });
    }

    const taskId = task.id;
    await this.taskRepository.remove(task);
    this.eventBus.publish(
      new AshlandLogEvent({
        message: `Task with id of ${taskId} was deleted`,
        type: LoggerMessageType.LOG,
        component: 'MysqlTask',
        occurredAt: new Date().toString(),
        service: 'Gallatin',
      }),
    );
    return {};
  }
  //
  async updateTask(request: UpdateTaskDto): Promise<TaskDto> {
    const task = await this.taskRepository.findOne({
      where: { id: request.id },
      relations: { parent: true },
    });
    if (!task) {
      throw new RpcException({
        code: 5,
        message: `Task with id of ${request.id} not found`,
      });
    }
    const updatedTask = {
      ...task,
      updatedAt: new Date().toString(),
      title: request.title ? request.title : task.title,
      description: request.description ? request.description : task.description,
    };

    if (request.parentId) {
      const parentTask = await this.taskRepository.findOne({
        where: { id: request.parentId },
      });

      if (!parentTask) {
        throw new RpcException({
          code: 5,
          message: `Task with id of ${request.id} not found`,
        });
      }

      updatedTask.parent = parentTask;
    }

    const savedTask = await this.taskRepository.save(updatedTask);
    this.eventBus.publish(
      new AshlandLogEvent({
        message: `Task with id of ${task.id} was updated`,
        type: LoggerMessageType.LOG,
        component: 'MysqlTask',
        occurredAt: new Date().toString(),
        service: 'Gallatin',
      }),
    );

    return savedTask;
  }
}
