import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './constants/categories.type';
import {
  CreateTaskRequestDto,
  CreateTaskResponseDto,
  DeleteTaskResponseDto,
  GetTaskResponseDto,
  GetTasksRequestDto,
  UpdateTaskRequestDto,
  UpdateTaskResponseDto,
} from './dto';
import { TaskEntity } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  // 조회 - 전체
  // DB의 모든 데이터를 배열 형태로 가져옵니다.
  // SQL: SELECT * FROM tasks;
  async getTasks(
    query: GetTasksRequestDto = {},
  ): Promise<GetTaskResponseDto[]> {
    const category: Category | undefined = query.category;
    const hasCategoryFilter: boolean = category !== undefined;
    const rows: TaskEntity[] = hasCategoryFilter
      ? await this.taskRepository.find({ where: { category } })
      : await this.taskRepository.find();
    return rows.map((task: TaskEntity) =>
      this.mapTaskEntityToGetResponse(task),
    );
  }

  // 조회 - (개별)
  // 특정 ID를 가진 데이터를 찾고, 없으면 404 에러를 던집니다.
  // SQL: SELECT * FROM tasks WHERE id = ?;
  async getTask(id: number): Promise<GetTaskResponseDto> {
    const task: TaskEntity = await this.loadTaskEntityByIdOrThrow(id);
    return this.mapTaskEntityToGetResponse(task);
  }

  private async loadTaskEntityByIdOrThrow(id: number): Promise<TaskEntity> {
    const task: TaskEntity | null = await this.taskRepository.findOne({
      where: { id },
    });
    if (!task) {
      throw new NotFoundException(`ID 값이 ${id}인 데이터를 찾을 수 없습니다.`);
    }
    return task;
  }

  private mapTaskEntityToGetResponse(entity: TaskEntity): GetTaskResponseDto {
    return {
      id: entity.id,
      title: entity.title,
      content: entity.content,
      category: entity.category,
      thumbnail: entity.thumbnail,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  // 생성
  // DTO를 엔티티 객체로 매핑한 후 실제 DB에 저장합니다.
  // SQL: INSERT INTO tasks (title, content, category, thumbnail, ...) VALUES (?, ?, ?, ?);

  async createTask(
    payload: CreateTaskRequestDto,
  ): Promise<CreateTaskResponseDto> {
    // Entity 기반으로 설계된 테이블 구조에 맞게 매핑한 후 저장
    // create(): DTO 데이터를 바탕으로 새로운 엔티티 인스턴스를 생성합니다. (DB 저장 전 단계)
    const newTask = this.taskRepository.create(payload);

    // save() : 생성된 엔티티 객체를 실제 DB 테이블에 저장합니다.
    await this.taskRepository.save(newTask);

    return {
      message: '테스크 생성을 완료했습니다.',
      id: newTask.id,
      statusCode: HttpStatus.CREATED, // 201
    };
  }

  // 수정
  // 특정 ID의 데이터를 찾아 페이로드(UpdateTaskRequestDto)의 내용으로 변경합니다.
  // SQL: UPDATE tasks SET title = ?, content = ?, category = ?, thumbnail = ? WHERE id = ?;
  async updateTask(
    id: number,
    payload: UpdateTaskRequestDto,
  ): Promise<UpdateTaskResponseDto> {
    // 기존 데이터 확인 — 없으면 loadTaskEntityByIdOrThrow 에서 NotFoundException
    const task: TaskEntity = await this.loadTaskEntityByIdOrThrow(id);

    // 데이터 병합(Merge)
    // Object.assign(대상객체, 소스객체) 를 사용하여 기존 엔티티에 수정된 내용만 덮어씌웁니다.
    // payload 에 없는 속성은 이전값을 유지합니다.
    Object.assign(task, payload);

    // DB 저장
    // save() 메서드는 엔티티에 primary key(id)가 포함되어 있으면
    // 새로운 행을 생성하지 않고, 기존 행을 업데이트 합니다.
    await this.taskRepository.save(task);

    return {
      message: '테스크 수정을 완료했습니다.',
      id: task.id,
      statusCode: HttpStatus.OK, // 200
    };
  }

  // 삭제
  // ID를 기준으로 데이터를 삭제합니다.
  // SQL: DELETE FROM tasks WHERE id = ?;
  async deleteTask(id: number): Promise<DeleteTaskResponseDto> {
    const task = await this.loadTaskEntityByIdOrThrow(id);
    // delete(): 해당 ID의 데이터를 삭제합니다.
    await this.taskRepository.delete(id);

    return {
      message: '테스크 삭제를 완료했습니다.',
      id: task.id,
      statusCode: HttpStatus.NO_CONTENT, // 204
    };
  }
}
