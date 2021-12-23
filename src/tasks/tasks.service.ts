import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO } from './dtos/create-task.dto';
import { TaskStatus } from './tasks.status';
import { GetTasksFilterDTO } from './dtos/get-tasks-filter.dto';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  // async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
  //   const task: Task = {
  //     title: createTaskDTO.title,
  //     description: createTaskDTO.description,
  //     status: TaskStatus.OPEN,
  //   };

  //   this.tasks.push(task);
  //   return task;
  // }

  async getTasks(getTasksFilterDTO: GetTasksFilterDTO): Promise<Task[]> {
    let tasks = await this.getAllTasks();

    if (Object.keys(getTasksFilterDTO).length) {
      const { search, status } = getTasksFilterDTO;

      if (search) {
        tasks = tasks.filter(
          (task) =>
            task.title.toLowerCase().includes(search.toLowerCase()) ||
            task.description.toLowerCase().includes(search.toLowerCase()),
        );
      }

      if (status) {
        tasks = tasks.filter((task) => task.status === status);
      }
    }

    return tasks;
  }

  async getAllTasks(): Promise<Task[]> {
    return this.tasks;
  }

  async getTaskById(id: string): Promise<Task> {
    const foundTask = this.tasks.find((task) => task.id === id);

    if (!foundTask) {
      throw new NotFoundException(`No task with id ${id} was found`);
    }

    return foundTask;
  }

  async deleteTask(id: string): Promise<void> {
    const task = await this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  async patchTaskStatus(id: string, status: TaskStatus): Promise<void> {
    const task = await this.getTaskById(id);

    if (!task) {
      throw new NotFoundException('There is no tasks with the id informed');
    }

    task.status = status;
  }
}
