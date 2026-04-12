import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional } from 'class-validator';
import {
  CATEGORIES,
  CATEGORY_ALLOWED_VALUES_MESSAGE,
  type Category,
} from '@/modules/tasks/constants/categories.type';

/**
 * GET /tasks — 목록 조회 시 쿼리(선택 필터)
 */
export class GetTasksRequestDto {
  @ApiPropertyOptional({
    description: '카테고리로 필터링',
    example: '생활',
    enum: CATEGORIES,
  })
  @IsOptional()
  @IsIn(CATEGORIES, { message: CATEGORY_ALLOWED_VALUES_MESSAGE })
  category?: Category;
}
