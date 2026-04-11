import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ description: '할 일 제목', example: '장보기' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: '상세 내용', example: '우유, 계란 구매' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ description: '카테고리', example: '생활' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    description: '썸네일 URL 또는 경로',
    example: 'https://example.com/thumbnail.jpg',
  })
  @IsString()
  @IsNotEmpty()
  thumbnail: string;
}
