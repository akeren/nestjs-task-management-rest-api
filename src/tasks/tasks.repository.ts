import { EntityRepository, Repository } from 'typeorm';
import { Task } from '@src/tasks/task.entity';
import { CreateTaskDto } from '@src/tasks/dto/create-task.dto';
import { TaskStatus } from '@src/tasks/task-status.enum';
import { GetTasksFilterDto } from '@src/tasks/dto/get-tasks-filter.dto';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async getTasks(taskFilterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = taskFilterDto;

    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task: Task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.save(task);

    return task;
  }
}
