import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateTaskCommand } from './create-task.command';
import { TaskDto } from '@app/common';
import { MysqlTask } from '../../Database/mysqlTask';

@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly mysqlTask: MysqlTask,
  ) {}
  async execute({ createTaskDto }: CreateTaskCommand): Promise<TaskDto> {
    return await this.mysqlTask.createTask(createTaskDto);
  }
}
