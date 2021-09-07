import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from '@src/tasks/tasks.service';
import { Task } from '@src/tasks/task.model';
import { CreateTaskDto } from '@src/tasks/dto/create-task.dto';
import { TaskStatus } from '@src/tasks/task.model';

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

  @Patch('/:id/status')
  @HttpCode(202)
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.taskService.updateTaskStatus(id, status);
  }

  @Delete('/:id')
  @HttpCode(204)
  deleteTask(@Param('id') id: string): void {
    return this.taskService.deleteTask(id);
  }
}
