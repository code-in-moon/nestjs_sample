import { Controller } from '@nestjs/common';

import { Ctx, EventPattern, Payload } from '@nestjs/microservices';
import { CustomLoggerService } from './customLoggerService/custom-logger.service';

@Controller()
export class AshlandController {
  constructor(private readonly loggerService: CustomLoggerService) {}

  @EventPattern('LOG_ASHLAND')
  async handleLogEvent(@Payload() data: any) {
    this.loggerService.handleLog(data);
  }
}
