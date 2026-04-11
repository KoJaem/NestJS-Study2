import { ApiProperty } from '@nestjs/swagger';

/**
 * PATCH 수정 응답 (message, id, statusCode 형태는 생성·삭제 응답과 동일)
 */
export class UpdateTaskResponseDto {
  @ApiProperty({
    description: '처리 결과 메시지',
    example: '테스크 수정을 완료했습니다.',
  })
  message: string;

  @ApiProperty({ description: '대상 할 일 ID', example: 1 })
  id: number;

  @ApiProperty({
    description: '응답 본문에 담긴 상태 코드 값',
    example: 200,
  })
  statusCode: number;
}
