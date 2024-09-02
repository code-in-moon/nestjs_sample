import {
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UpdateTaskDto } from '@app/common';

export class UpdateRequestDto implements Omit<UpdateTaskDto, 'id'> {
  @IsString()
  @MinLength(3)
  @IsOptional()
  description?: string;
  @IsUUID()
  @IsOptional()
  parentId?: string;
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @IsOptional()
  title?: string;
}
