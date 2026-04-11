import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateTaskRequestDto,
  CreateTaskResponseDto,
  DeleteTaskResponseDto,
  GetTaskRequestDto,
  GetTaskResponseDto,
  GetTasksRequestDto,
  UpdateTaskRequestDto,
  UpdateTaskResponseDto,
} from './dto';
import { TaskService } from './task.service';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @ApiQuery({
    name: 'category',
    required: false,
    description: '카테고리로 필터링',
    example: '생활',
  })
  @ApiOkResponse({
    description: '할 일 목록',
    type: GetTaskResponseDto,
    isArray: true,
  })
  async findAll(
    @Query() query: GetTasksRequestDto,
  ): Promise<GetTaskResponseDto[]> {
    return await this.taskService.getTasks(query);
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: '할 일 ID', example: 1 })
  @ApiOkResponse({ description: '할 일 단건', type: GetTaskResponseDto })
  @ApiNotFoundResponse({ description: '해당 ID의 할 일이 없음' })
  async findOne(
    @Param() params: GetTaskRequestDto,
  ): Promise<GetTaskResponseDto> {
    return await this.taskService.getTask(params.id);
  }

  @Post()
  @ApiCreatedResponse({
    description: '생성 완료',
    type: CreateTaskResponseDto,
  })
  async create(
    @Body() body: CreateTaskRequestDto,
  ): Promise<CreateTaskResponseDto> {
    return await this.taskService.createTask(body);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', description: '할 일 ID' })
  @ApiOkResponse({
    description: '수정 완료',
    type: UpdateTaskResponseDto,
  })
  @ApiNotFoundResponse({ description: '해당 ID의 할 일이 없음' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateTaskRequestDto,
  ): Promise<UpdateTaskResponseDto> {
    return await this.taskService.updateTask(id, body);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: '할 일 ID' })
  @ApiOkResponse({
    description: '삭제 완료',
    type: DeleteTaskResponseDto,
  })
  @ApiNotFoundResponse({ description: '해당 ID의 할 일이 없음' })
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteTaskResponseDto> {
    return await this.taskService.deleteTask(id);
  }
}
