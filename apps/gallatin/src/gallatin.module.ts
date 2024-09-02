import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { ASHLAND_RMQ_SERVICE, MysqlModule, RmqModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TaskModule,
    MysqlModule.register(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/gallatin/.env',
    }),
  ],
  controllers: [],
  providers: [],
})
export class GallatinModule {}
