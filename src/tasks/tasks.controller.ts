import { Body, Controller } from '@nestjs/common';
import { CreateTaskDTO } from './dtos/create-task.dto';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  async createTask(@Body() createTaskDTO: CreateTaskDTO): Promise<Task> {
    return await this.tasksService.createTask(createTaskDTO);
  }
}
