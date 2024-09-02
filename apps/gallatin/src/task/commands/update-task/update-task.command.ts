import { UpdateTaskDto } from '@app/common';

export class UpdateTaskCommand {
  constructor(public readonly updateTaskDto: UpdateTaskDto) {}
}
