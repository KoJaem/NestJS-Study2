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
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
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
  @ApiOperation({
    summary: '할 일 목록 조회',
    description:
      '저장소에 있는 할 일을 배열로 반환합니다. 선택 쿼리 `category`로 동일 카테고리만 좁힐 수 있습니다.',
  })
  @ApiQuery({
    name: 'category',
    required: false,
    description: '카테고리로 필터링',
    example: '생활',
  })
  @ApiOkResponse({
    description: '조회 성공 — 할 일 객체 배열',
    type: GetTaskResponseDto,
    isArray: true,
  })
  @ApiBadRequestResponse({
    description: '쿼리 파라미터 유효성 검사 실패',
  })
  async findAll(
    @Query() query: GetTasksRequestDto,
  ): Promise<GetTaskResponseDto[]> {
    return await this.taskService.getTasks(query);
  }

  @Get(':id')
  @ApiOperation({
    summary: '할 일 단건 조회',
    description:
      '경로 변수 `id`에 해당하는 할 일 한 건을 반환합니다. 존재하지 않으면 404입니다.',
  })
  @ApiParam({ name: 'id', description: '할 일 ID', example: 1 })
  @ApiOkResponse({
    description: '조회 성공 — 할 일 단건',
    type: GetTaskResponseDto,
  })
  @ApiBadRequestResponse({
    description: '경로의 id가 유효하지 않음(양의 정수가 아님 등)',
  })
  @ApiNotFoundResponse({ description: '해당 ID의 할 일이 없음' })
  async findOne(
    @Param() params: GetTaskRequestDto,
  ): Promise<GetTaskResponseDto> {
    return await this.taskService.getTask(params.id);
  }

  @Post()
  @ApiOperation({
    summary: '할 일 생성',
    description:
      '요청 본문의 제목·내용·카테고리·썸네일로 새 할 일을 저장합니다. 성공 시 생성 메시지와 ID, 상태 코드(201)를 돌려줍니다.',
  })
  @ApiBody({
    type: CreateTaskRequestDto,
    description: '필수: title, content, category, thumbnail',
  })
  @ApiCreatedResponse({
    description: '생성 완료 — 처리 메시지·생성된 ID·201',
    type: CreateTaskResponseDto,
  })
  @ApiBadRequestResponse({
    description: '요청 본문 유효성 검사 실패(필드 누락·형식 오류)',
  })
  async create(
    @Body() body: CreateTaskRequestDto,
  ): Promise<CreateTaskResponseDto> {
    return await this.taskService.createTask(body);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '할 일 부분 수정',
    description:
      '보낸 필드만 갱신하고, 생략한 필드는 기존 값을 유지합니다. 대상 ID가 없으면 404입니다.',
  })
  @ApiParam({ name: 'id', description: '할 일 ID' })
  @ApiBody({
    type: UpdateTaskRequestDto,
    description: '수정할 필드만 포함(모두 선택)',
  })
  @ApiOkResponse({
    description: '수정 완료 — 처리 메시지·대상 ID·200',
    type: UpdateTaskResponseDto,
  })
  @ApiBadRequestResponse({
    description: '경로 id 또는 본문 유효성 검사 실패',
  })
  @ApiNotFoundResponse({ description: '해당 ID의 할 일이 없음' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateTaskRequestDto,
  ): Promise<UpdateTaskResponseDto> {
    return await this.taskService.updateTask(id, body);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '할 일 삭제',
    description:
      '지정한 ID의 할 일을 DB에서 제거합니다. 성공 시 삭제 안내와 ID, 응답에 담긴 상태 코드 값을 반환합니다.',
  })
  @ApiParam({ name: 'id', description: '할 일 ID' })
  @ApiOkResponse({
    description: '삭제 처리 완료 — 처리 메시지·삭제된 ID·본문 statusCode',
    type: DeleteTaskResponseDto,
  })
  @ApiBadRequestResponse({
    description: '경로의 id가 유효하지 않음',
  })
  @ApiNotFoundResponse({ description: '해당 ID의 할 일이 없음' })
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteTaskResponseDto> {
    return await this.taskService.deleteTask(id);
  }
}
