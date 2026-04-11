import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

/**
 * GET /tasks — 목록 조회 시 쿼리(선택 필터)
 */
export class GetTasksRequestDto {
  @ApiPropertyOptional({
    description: '카테고리로 필터링',
    example: '생활',
  })
  @IsOptional()
  @IsString()
  category?: string;
}
