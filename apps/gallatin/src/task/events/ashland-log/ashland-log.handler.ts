import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AshlandLogEvent } from './ashland-log.event';
import { Inject } from '@nestjs/common';
import { ASHLAND_RMQ_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@EventsHandler(AshlandLogEvent)
export class AshlandLogHandler implements IEventHandler<AshlandLogEvent> {
  constructor(
    @Inject(ASHLAND_RMQ_SERVICE) private ashlandRmqClient: ClientProxy,
  ) {}
  async handle({ ashlandLogEventDto }: AshlandLogEvent) {
    await lastValueFrom(
      this.ashlandRmqClient.emit('LOG_ASHLAND', ashlandLogEventDto),
    );
    console.log(ashlandLogEventDto);
  }
}
