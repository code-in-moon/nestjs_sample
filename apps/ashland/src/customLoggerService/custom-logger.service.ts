import { Injectable, Logger } from '@nestjs/common';
import { LoggerMessageType } from '@app/common';

@Injectable()
export class CustomLoggerService {
  private readonly logger = new Logger('ASHLAND LOG SERVICE');

  handleLog<T extends { type: LoggerMessageType }>(message: T) {
    switch (message.type) {
      case LoggerMessageType.LOG:
        this.logger.log(message);
        break;
      case LoggerMessageType.WARN:
        this.logger.warn(message);
        break;
      case LoggerMessageType.ERROR:
        this.logger.error(message);
        break;
      default:
        this.logger.log(message);
    }
  }
}
