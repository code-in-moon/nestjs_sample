import {
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CreateTaskDto } from '@app/common';

export class CreateRequestDto implements CreateTaskDto {
  @IsString()
  @MinLength(3)
  description: string;
  @IsUUID()
  @IsOptional()
  parentId?: string;

  @IsString()
  @MinLength(3)
  @MaxLength(255)
  title: string;
}
