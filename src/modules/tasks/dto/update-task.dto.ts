import { IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional() // 필수 값이 아닌 선택적 요소
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  thumbnail?: string;
}
