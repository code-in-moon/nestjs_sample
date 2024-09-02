import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteTaskCommand } from './delete-task.command';
import { TaskService } from '../../task.service';

@CommandHandler(DeleteTaskCommand)
export class DeleteTaskHandler implements ICommandHandler<DeleteTaskCommand> {
  constructor(private readonly taskService: TaskService) {}
  async execute({ getTaskDto }: DeleteTaskCommand) {
    return this.taskService.removeTask(getTaskDto);
  }
}
