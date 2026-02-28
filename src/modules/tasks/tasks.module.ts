import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { TaskCommentEntity } from './entities/task-comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity, TaskCommentEntity])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
