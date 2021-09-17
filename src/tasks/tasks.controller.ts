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
  UseGuards,
} from '@nestjs/common';
import { TasksService } from '@src/tasks/tasks.service';
import { CreateTaskDto } from '@src/tasks/dto/create-task.dto';
import { GetTasksFilterDto } from '@src/tasks/dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from '@src/tasks/dto/update-task-status.dto';
import { Task } from '@src/tasks/task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetMe } from '@src/auth/get-me.decorator';
import { User } from '@src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  async getTasks(
    @Query() taskFileterDto: GetTasksFilterDto,
    @GetMe() user: User,
  ): Promise<Task[]> {
    return this.taskService.getTasks(taskFileterDto, user);
  }

  @Get('/:id')
  async getTaskById(
    @Param('id') id: string,
    @GetMe() user: User,
  ): Promise<Task> {
    return this.taskService.getTaskById(id, user);
  }

  @Post()
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetMe() user: User,
  ): Promise<Task> {
    return this.taskService.createTask(createTaskDto, user);
  }

  @Patch('/:id/status')
  @HttpCode(202)
  async updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetMe() user: User,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.taskService.updateTaskStatus(id, status, user);
  }

  @Delete('/:id')
  @HttpCode(204)
  async deleteTask(
    @Param('id') id: string,
    @GetMe() user: User,
  ): Promise<void> {
    return this.taskService.deleteTask(id, user);
  }
}
