import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tasks')
export class TaskEntity {
  @ApiProperty({ description: '할 일 ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '제목', example: '장보기' })
  @Column()
  title: string;

  @ApiProperty({ description: '내용', example: '우유, 계란 구매' })
  @Column()
  content: string;

  @ApiProperty({ description: '카테고리', example: '생활' })
  @Column()
  category: string;

  @ApiProperty({
    description: '썸네일 URL 또는 경로',
    example: 'https://example.com/thumbnail.jpg',
  })
  @Column()
  thumbnail: string;

  @ApiProperty({
    description: '생성 일시',
    type: String,
    format: 'date-time',
    example: '2026-04-11T12:00:00.000Z',
  })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({
    description: '수정 일시',
    type: String,
    format: 'date-time',
    example: '2026-04-11T12:00:00.000Z',
  })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
