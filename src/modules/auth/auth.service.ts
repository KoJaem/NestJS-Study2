import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@/modules/user/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserWithoutPassword } from './types/user-without-password.type';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse, LoginUser } from './types/login-user.type';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserWithoutPassword | null> {
    const user = await this.userRepository.findOneBy({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      return this.mapUserToPublicWithoutPassword(user);
    }

    return null;
  }

  login(user: LoginUser): LoginResponse {
    const payload = { username: user.username, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET, // payload는 secret 없이 디코딩 가능하지만, 토큰 위/변조 검증을 위해 secret이 필요하다.
      }),
    };
  }

  async register(
    username: string,
    password: string,
  ): Promise<UserWithoutPassword> {
    const existingUser = await this.userRepository.findOneBy({ username });

    if (existingUser) {
      throw new BadRequestException('이미 존재하는 사용자입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const savedUser = await this.userRepository.save({
      username,
      password: hashedPassword,
    });

    return this.mapUserToPublicWithoutPassword(savedUser);
  }

  /**
   * 저장된 User 엔티티에서 비밀번호 필드를 제외한 공개 응답 객체를 만듭니다.
   * (구조 분해로 제거하면 미사용 변수 린트 이슈가 생겨, 허용 필드만 명시합니다.)
   */
  private mapUserToPublicWithoutPassword(user: User): UserWithoutPassword {
    return {
      id: user.id,
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      version: user.version,
    };
  }
}
