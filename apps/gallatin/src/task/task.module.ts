import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { TaskEventHandlers } from './events';
import { TaskCommandHandlers } from './commands';
import { TaskQueryHandlers } from './queries';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { MysqlTask } from './Database/mysqlTask';
import { ASHLAND_RMQ_SERVICE, RmqModule } from '@app/common';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Task]),
    RmqModule.register({ name: ASHLAND_RMQ_SERVICE }),
  ],
  controllers: [TaskController],
  providers: [
    ...TaskEventHandlers,
    ...TaskCommandHandlers,
    ...TaskQueryHandlers,
    MysqlTask,
  ],
})
export class TaskModule {}
