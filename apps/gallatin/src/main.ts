import { NestFactory } from '@nestjs/core';
import { GallatinModule } from './gallatin.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'node:path';
import { GALLATIN_PACKAGE_NAME } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    GallatinModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../gallatin.proto'),
        package: GALLATIN_PACKAGE_NAME,
        // url: '0.0.0.0:50051',
      },
    },
  );
  await app.listen();
}
bootstrap();
