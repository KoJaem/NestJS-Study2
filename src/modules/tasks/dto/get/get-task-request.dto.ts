import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

/**
 * GET /tasks/:id — 경로 파라미터(id) 검증
 */
export class GetTaskRequestDto {
  @ApiProperty({ description: '할 일 ID', example: 1, minimum: 1 })
  @Type(() => Number)
  @IsInt({ message: '할 일 ID는 정수여야 합니다.' })
  @Min(1, { message: '할 일 ID는 1 이상이어야 합니다.' })
  id: number;
}
