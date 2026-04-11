import { ApiProperty } from '@nestjs/swagger';

/**
 * POST 생성 응답 (message, id, statusCode 필드 구조는 다른 작업 응답과 유사)
 */
export class CreateTaskResponseDto {
  @ApiProperty({
    description: '처리 결과 메시지',
    example: '테스크 생성을 완료했습니다.',
  })
  message: string;

  @ApiProperty({ description: '대상 할 일 ID', example: 1 })
  id: number;

  @ApiProperty({
    description: '응답 본문에 담긴 상태 코드 값',
    example: 201,
  })
  statusCode: number;
}
