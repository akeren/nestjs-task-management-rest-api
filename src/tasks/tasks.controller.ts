import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from '@src/tasks/tasks.service';
import { Task } from '@src/tasks/task.model';
import { CreateTaskDto } from '@src/tasks/dto/create-task.dto';
import { GetTasksFilterDto } from '@src/tasks/dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from '@src/tasks/dto/update-task-status.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() taskFileterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(taskFileterDto).length) {
      return this.taskService.getTasksWithFilters(taskFileterDto);
    }
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
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Task {
    const { status } = updateTaskStatusDto;
    return this.taskService.updateTaskStatus(id, status);
  }

  @Delete('/:id')
  @HttpCode(204)
  deleteTask(@Param('id') id: string): void {
    return this.taskService.deleteTask(id);
  }
}
