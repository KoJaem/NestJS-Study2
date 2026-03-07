import { Injectable } from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './dto';

@Injectable()
export class TaskService {
  // 조회 - 전체
  getTasks() {}

  // 조회 - (개별)
  getTask(id: number) {}

  // 생성
  createTask(payload: CreateTaskDto) {
    // Entity 기반으로 설계된 테이블 구조에 맞게 매핑한 후 저장
  }

  // 업데이트
  updateTask(id: number, payload: UpdateTaskDto) {}

  // 수정
  modifyTask(id: number, payload: UpdateTaskDto) {}

  // 삭제
  deleteTask(id: number) {}
}
