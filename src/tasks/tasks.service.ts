import { Injectable } from '@nestjs/common';
import { CreateTaskDTO } from './dtos/create-task.dto';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
    const task: Task = {
      id: uuid(),
      title: createTaskDTO.title,
      description: createTaskDTO.description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  async getAllTasks(): Promise<Task[]> {
    return this.tasks;
  }

  async getTaskById(id: string): Promise<Task> {
    return this.tasks.find((task) => task.id === id);
  }

  async deleteTask(id: string): Promise<void> {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
