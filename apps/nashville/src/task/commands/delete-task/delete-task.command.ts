import { GetTaskDto } from '@app/common';

export class DeleteTaskCommand {
  constructor(public readonly getTaskDto: GetTaskDto) {}
}
