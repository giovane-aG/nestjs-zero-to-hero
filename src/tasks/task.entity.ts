import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './tasks.status';

export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;
}
