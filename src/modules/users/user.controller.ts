import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

/**
 * 사용자 도메인 API (엔드포인트 추가 시 메서드마다 @ApiOperation을 붙이면 됩니다)
 */
@ApiTags('users')
@Controller('users')
export class UserController {}
