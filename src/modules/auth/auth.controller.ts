import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { KakaoLoginDto } from './dto/kakao-login.dto';
import { LocalGuard } from './guard/local.guard';
import { UserWithoutPassword } from './types/user-without-password.type';
import { AuthTokenResponse } from './types/login-user.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() dto: RegisterDto): Promise<UserWithoutPassword> {
    return this.authService.register(dto.username, dto.password);
  }

  @Post('kakao')
  async kakaoLogin(@Body() dto: KakaoLoginDto): Promise<AuthTokenResponse> {
    return this.authService.loginWithKakao(dto.kakaoAccessToken);
  }
}
