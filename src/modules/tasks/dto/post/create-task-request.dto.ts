import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import {
  CATEGORIES,
  CATEGORY_ALLOWED_VALUES_MESSAGE,
  type Category,
} from '@/modules/tasks/constants/categories.type';

export class CreateTaskRequestDto {
  @ApiProperty({ description: '할 일 제목', example: '장보기' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: '상세 내용', example: '우유, 계란 구매' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: '카테고리',
    example: '생활',
    enum: CATEGORIES,
  })
  @IsNotEmpty()
  // IsEnum은 TypeScript enum 객체용이라 문자열 배열에 쓰면 기본 오류 문구에 값이 안 붙음 → IsIn + 명시 메시지
  @IsIn(CATEGORIES, { message: CATEGORY_ALLOWED_VALUES_MESSAGE })
  category: Category;

  @ApiProperty({
    description: '썸네일 URL 또는 경로',
    example: 'https://example.com/thumbnail.jpg',
  })
  @IsString()
  @IsNotEmpty()
  thumbnail: string;
}
