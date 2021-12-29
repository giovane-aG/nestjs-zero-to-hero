import { Injectable } from '@nestjs/common';
import { CreateTaskDTO } from './dtos/create-task.dto';
import { TaskStatus } from './tasks.status';
import { GetTasksFilterDTO } from './dtos/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TasksRepository } from './tasks-repository';
import { InjectRepository } from '@nestjs/typeorm';
import { IdNotFoundException } from 'src/common/errors/id-not-found.exception';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private readonly tasksRepository: TasksRepository,
  ) {}

  async createTask(createTaskDTO: CreateTaskDTO, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDTO, user);
  }

  async getTasks(
    tasksFilterDTO: GetTasksFilterDTO,
    user: User,
  ): Promise<Task[]> {
    return await this.tasksRepository.getTasks(tasksFilterDTO, user);
  }

  async getAllTasks(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const foundTask = await this.tasksRepository.findOne({
      id,
      user,
    });

    if (!foundTask) {
      throw new IdNotFoundException(id);
    }

    return foundTask;
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    if (!result.affected) {
      throw new IdNotFoundException(id);
    }
  }

  async patchTaskStatus(id: string, status: TaskStatus): Promise<void> {
    const result = await this.tasksRepository.update(id, { status });
    if (!result.affected) {
      throw new IdNotFoundException(id);
    }
  }
}
