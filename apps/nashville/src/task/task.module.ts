import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { TaskCommandHandlers } from './commands';
import { TaskQueryHandlers } from './queries';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GALLATIN_PACKAGE_NAME } from '@app/common';
import { join } from 'path';
import { TaskService } from './task.service';
import { GALLATIN_SERVICE } from '../constant';

@Module({
  imports: [
    CqrsModule,
    ClientsModule.register([
      {
        name: GALLATIN_SERVICE,
        transport: Transport.GRPC,
        options: {
          protoPath: join(__dirname, '../gallatin.proto'),
          package: GALLATIN_PACKAGE_NAME,
        },
      },
    ]),
  ],
  controllers: [TaskController],
  providers: [...TaskCommandHandlers, ...TaskQueryHandlers, TaskService],
})
export class TaskModule {}
