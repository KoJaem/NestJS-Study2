import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';
import {
  CATEGORIES,
  CATEGORY_ALLOWED_VALUES_MESSAGE,
  type Category,
} from '@/modules/tasks/constants/categories.type';

/**
 * PATCH /tasks/:id — 수정 요청 본문(부분 갱신)
 */
export class UpdateTaskRequestDto {
  @ApiPropertyOptional({ description: '할 일 제목', example: '장보기' })
  @IsOptional() // 필수 값이 아닌 선택적 요소
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: '상세 내용', example: '우유, 계란 구매' })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({ description: '카테고리', example: '생활' })
  @IsOptional()
  @IsIn(CATEGORIES, { message: CATEGORY_ALLOWED_VALUES_MESSAGE })
  category?: Category;

  @ApiPropertyOptional({
    description: '썸네일 URL 또는 경로',
    example: 'https://example.com/thumb.jpg',
  })
  @IsOptional()
  @IsString()
  thumbnail?: string;
}
