import { IsEnum } from 'class-validator';
import { TaskStatus } from '../tasks.status';

export class UpdateTaskStatusDTO {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
