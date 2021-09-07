import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TasksService } from '@src/tasks/tasks.service';
import { Task } from '@src/tasks/task.model';
import { CreateTaskDto } from '@src/tasks/dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.taskService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.createTask(createTaskDto);
  }
}
