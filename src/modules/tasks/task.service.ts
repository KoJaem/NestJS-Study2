import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto, ModifyTaskDto, UpdateTaskDto } from './dto';
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
  async getTasks(): Promise<TaskEntity[]> {
    // find() 는 조건없이 호출하면 전체 데이터를 조회합니다.
    return await this.taskRepository.find();
  }

  // 조회 - (개별)
  // 특정 ID를 가진 데이터를 찾고, 없으면 404 에러를 던집니다.
  // SQL: SELECT * FROM tasks WHERE id = ?;
  async getTask(id: number): Promise<TaskEntity> {
    const task = await this.taskRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException(`ID 값이 ${id}인 데이터를 찾을 수 없습니다.`);
    }
    return task;
  }

  // 생성
  createTask(payload: CreateTaskDto) {
    // Entity 기반으로 설계된 테이블 구조에 맞게 매핑한 후 저장
  }

  // 업데이트
  updateTask(id: number, payload: UpdateTaskDto) {}

  // 수정
  modifyTask(id: number, payload: ModifyTaskDto) {}

  // 삭제
  deleteTask(id: number) {}
}
