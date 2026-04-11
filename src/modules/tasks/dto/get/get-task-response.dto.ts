import { ApiProperty } from '@nestjs/swagger';

/**
 * GET 할 일 조회 API 응답(단건·목록 항목 공통 형태)
 */
export class GetTaskResponseDto {
  @ApiProperty({ description: '할 일 ID', example: 1 })
  id: number;

  @ApiProperty({ description: '제목', example: '장보기' })
  title: string;

  @ApiProperty({ description: '내용', example: '우유, 계란 구매' })
  content: string;

  @ApiProperty({ description: '카테고리', example: '생활' })
  category: string;

  @ApiProperty({
    description: '썸네일 URL 또는 경로',
    example: 'https://example.com/thumbnail.jpg',
  })
  thumbnail: string;

  @ApiProperty({
    description: '생성 일시',
    type: String,
    format: 'date-time',
    example: '2026-04-11T12:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: '수정 일시',
    type: String,
    format: 'date-time',
    example: '2026-04-11T12:00:00.000Z',
  })
  updatedAt: Date;
}
