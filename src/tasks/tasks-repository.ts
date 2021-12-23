import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDTO } from './dtos/create-task.dto';
import { Task } from './task.entity';
import { TaskStatus } from './tasks.status';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
    const task: Task = new Task();
    const { title, description } = createTaskDTO;

    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;

    await this.save(task);
    return task;
  }
}
