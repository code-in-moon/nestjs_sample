import { CreateTaskDto } from '@app/common';

export class CreateTaskCommand {
  constructor(public readonly createTaskDto: CreateTaskDto) {}
}
