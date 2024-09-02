import { Module } from '@nestjs/common';
import { AshlandController } from './ashland.controller';
import { ConfigModule } from '@nestjs/config';
import { RmqModule } from '@app/common';
import { CustomLoggerModule } from './customLoggerService/custom-logger.module';
import { CustomLoggerService } from './customLoggerService/custom-logger.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/ashland/.env',
    }),
    RmqModule,
    CustomLoggerModule,
  ],
  controllers: [AshlandController],
  providers: [CustomLoggerService],
})
export class AshlandModule {}
