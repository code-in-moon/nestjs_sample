import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTaskCommand } from './update-task.command';
import { TaskDto } from '@app/common';
import { MysqlTask } from '../../Database/mysqlTask';

@CommandHandler(UpdateTaskCommand)
export class UpdateTaskHandler implements ICommandHandler<UpdateTaskCommand> {
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly mysqlTask: MysqlTask,
  ) {}
  async execute({ updateTaskDto }: UpdateTaskCommand): Promise<TaskDto> {
    return this.mysqlTask.updateTask(updateTaskDto);
  }
}
