import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { TaskEntity } from './entities/task.entity';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // 조회 - 전체
  @Get()
  async findAll(): Promise<TaskEntity[]> {
    return await this.taskService.getTasks();
  }

  // 조회 - (개별)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<TaskEntity> {
    return await this.taskService.getTask(id);
  }

  // 생성
  @Post()
  async create(@Body() body: CreateTaskDto) {
    return await this.taskService.createTask(body);
  }

  // 업데이트
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateTaskDto,
  ) {
    return this.taskService.updateTask(id, body);
  }

  // 삭제
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.taskService.deleteTask(id);
  }
}
