import { PaginatedTasksListHandler } from './paginatedTasksList/paginated-tasks-list.handler';
import { GetTaskHandler } from './get-task/get-task.handler';

export const TaskQueryHandlers = [PaginatedTasksListHandler, GetTaskHandler];
