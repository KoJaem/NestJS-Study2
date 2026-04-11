import { ApiProperty } from '@nestjs/swagger';

/**
 * DELETE 삭제 응답 (본문 필드는 생성·수정 응답과 동일한 형태)
 */
export class DeleteTaskResponseDto {
  @ApiProperty({
    description: '처리 결과 메시지',
    example: '테스크 삭제를 완료했습니다.',
  })
  message: string;

  @ApiProperty({ description: '대상 할 일 ID', example: 1 })
  id: number;

  @ApiProperty({
    description: '응답 본문에 담긴 상태 코드 값',
    example: 204,
  })
  statusCode: number;
}
