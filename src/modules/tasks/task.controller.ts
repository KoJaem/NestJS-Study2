import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // 조회 - 전체
  @Get()
  findAll() {}

  // 조회 - (개별)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {}

  // 생성
  @Post()
  create() {}

  // 업데이트
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number) {}

  // 수정
  @Patch(':id')
  modify(@Param('id', ParseIntPipe) id: number) {}

  // 삭제
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {}
}
