import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteTaskCommand } from './delete-task.command';
import { MysqlTask } from '../../Database/mysqlTask';

@CommandHandler(DeleteTaskCommand)
export class DeleteTaskHandler implements ICommandHandler<DeleteTaskCommand> {
  constructor(private readonly mysqlTask: MysqlTask) {}
  async execute({ getTaskDto }: DeleteTaskCommand) {
    return await this.mysqlTask.removeTask(getTaskDto);
  }
}
