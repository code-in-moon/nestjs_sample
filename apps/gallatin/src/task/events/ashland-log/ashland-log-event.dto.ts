import { LoggerMessageType } from '@app/common';

export interface AshlandLogEventDto {
  message: string;
  type: LoggerMessageType;
  occurredAt: string;
  service: string;
  component: string;
}
