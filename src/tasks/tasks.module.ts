import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from '@src/tasks/tasks.controller';
import { TasksService } from '@src/tasks/tasks.service';
import { TasksRepository } from '@src/tasks/tasks.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TasksRepository])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
