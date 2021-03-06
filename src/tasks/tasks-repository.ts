import { User } from '../auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDTO } from './dtos/create-task.dto';
import { GetTasksFilterDTO } from './dtos/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TaskStatus } from './tasks.status';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async createTask(createTaskDTO: CreateTaskDTO, user: User): Promise<Task> {
    const task: Task = new Task();
    const { title, description } = createTaskDTO;

    task.user = user;
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;

    await this.save(task);
    return task;
  }

  async getTasks(
    taskFilterDTO: GetTasksFilterDTO,
    user: User,
  ): Promise<Task[]> {
    const { search, status } = taskFilterDTO;

    const query = this.createQueryBuilder('task');
    query.where({ user });

    if (search) {
      query.andWhere(
        `(LOWER(title) LIKE LOWER(:search) OR LOWER(description) LIKE LOWER(:search))`,
        {
          search: `%${search}%`,
        },
      );
    }

    if (status) {
      query.andWhere(`status = :status`, { status });
    }

    return await query.getMany();
  }
}
