import { CreateTaskHandler } from './create-task/create-task.handler';
import { UpdateTaskHandler } from './update-task/update-task.handler';
import { DeleteTaskHandler } from './delete-task/delete-task.handler';

export const TaskCommandHandlers = [
  CreateTaskHandler,
  UpdateTaskHandler,
  DeleteTaskHandler,
];
