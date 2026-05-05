import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserWithoutPassword } from './types/user-without-password.type';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // /auth/register
  @Post('register')
  async register(@Body() dto: RegisterDto): Promise<UserWithoutPassword> {
    return this.authService.register(dto.username, dto.password);
  }
}
