import { GetTaskDto } from '@app/common';

export class GetTaskQuery {
  constructor(public readonly getTaskDto: GetTaskDto) {}
}
