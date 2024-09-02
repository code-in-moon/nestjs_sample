import { NestFactory } from '@nestjs/core';
import { AshlandModule } from './ashland.module';
import { RmqService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(AshlandModule);
  // await app.listen(3000);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('ASHLAND'));
  await app.startAllMicroservices();
}
bootstrap();
