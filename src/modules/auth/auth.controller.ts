import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LocalGuard } from './guard/local.guard';
import { UserWithoutPassword } from './types/user-without-password.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  // /auth/register
  @Post('register')
  async register(@Body() dto: RegisterDto): Promise<UserWithoutPassword> {
    return this.authService.register(dto.username, dto.password);
  }
}
