import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskStatus } from '@src/tasks/task-status.enum';
import { CreateTaskDto } from '@src/tasks/dto/create-task.dto';
import { GetTasksFilterDto } from '@src/tasks/dto/get-tasks-filter.dto';
import { TasksRepository } from '@src/tasks/tasks.repository';
import { Task } from '@src/tasks/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  async getTasks(taskFilterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(taskFilterDto);
  }

  async getTaskById(id: string): Promise<Task> {
    const task: Task = await this.tasksRepository.findOne(id);

    if (!task) {
      throw new NotFoundException(`Task with this ID ${id} is not found`);
    }

    return task;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task: Task = await this.getTaskById(id);

    task.status = status;
    await this.tasksRepository.save(task);

    return task;
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with this ID ${id} is not found`);
    }
  }
}
