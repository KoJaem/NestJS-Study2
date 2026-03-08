import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTaskDto, ModifyTaskDto, UpdateTaskDto } from './dto';
import { TaskService } from './task.service';
import { TaskEntity } from './entities/task.entity';

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
  create(@Body() body: CreateTaskDto) {
    this.taskService.createTask(body);
  }

  // 업데이트
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateTaskDto) {
    this.taskService.updateTask(id, body);
  }

  // 수정
  @Patch(':id')
  modify(@Param('id', ParseIntPipe) id: number, @Body() body: ModifyTaskDto) {
    this.taskService.modifyTask(id, body);
  }

  // 삭제
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    this.taskService.deleteTask(id);
  }
}
