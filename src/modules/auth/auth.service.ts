import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@/modules/user/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserWithoutPassword } from './types/user-without-password.type';
import { JwtService } from '@nestjs/jwt';
import {
  AuthTokenResponse,
  LoginResponse,
  LoginUser,
} from './types/login-user.type';
import { KakaoAuthService } from './services/kakao-auth.service';
import { AuthProvider } from './enums/auth-provider.enum';
import { JWT_ACCESS_EXPIRES_IN_SECONDS } from './constants/token.constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly kakaoAuthService: KakaoAuthService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserWithoutPassword | null> {
    const user = await this.userRepository.findOneBy({ username });
    if (!user?.password) {
      return null;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }
    return this.mapUserToPublicWithoutPassword(user);
  }

  login(user: LoginUser): LoginResponse {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.getJwtSecret(),
        expiresIn: JWT_ACCESS_EXPIRES_IN_SECONDS,
      }),
    };
  }

  async loginWithKakao(kakaoAccessToken: string): Promise<AuthTokenResponse> {
    const kakaoUserProfile =
      await this.kakaoAuthService.fetchUserProfile(kakaoAccessToken);
    const user = await this.findOrCreateKakaoUser(kakaoUserProfile);
    return this.createAuthTokenResponse(user);
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
      provider: AuthProvider.LOCAL,
    });
    return this.mapUserToPublicWithoutPassword(savedUser);
  }

  private async findOrCreateKakaoUser(
    kakaoUserProfile: Awaited<ReturnType<KakaoAuthService['fetchUserProfile']>>,
  ): Promise<User> {
    const providerId = String(kakaoUserProfile.id);
    const existingUser = await this.userRepository.findOneBy({
      provider: AuthProvider.KAKAO,
      providerId,
    });
    if (existingUser) {
      return this.updateKakaoUserProfile(existingUser, kakaoUserProfile);
    }
    const email = this.kakaoAuthService.extractEmail(kakaoUserProfile);
    const nickname = this.kakaoAuthService.extractNickname(kakaoUserProfile);
    return this.userRepository.save({
      username: this.buildKakaoUsername(providerId),
      password: null,
      provider: AuthProvider.KAKAO,
      providerId,
      email,
      nickname,
    });
  }

  private async updateKakaoUserProfile(
    user: User,
    kakaoUserProfile: Awaited<ReturnType<KakaoAuthService['fetchUserProfile']>>,
  ): Promise<User> {
    const email = this.kakaoAuthService.extractEmail(kakaoUserProfile);
    const nickname = this.kakaoAuthService.extractNickname(kakaoUserProfile);
    user.email = email ?? user.email;
    user.nickname = nickname ?? user.nickname;
    return this.userRepository.save(user);
  }

  private createAuthTokenResponse(user: User): AuthTokenResponse {
    const loginUser: LoginUser = { id: user.id, username: user.username };
    return {
      accessToken: this.createAccessToken(loginUser),
      user: this.mapUserToPublicWithoutPassword(user),
    };
  }

  private createAccessToken(user: LoginUser): string {
    const payload = { username: user.username, sub: user.id };
    return this.jwtService.sign(payload, {
      secret: this.getJwtSecret(),
      expiresIn: JWT_ACCESS_EXPIRES_IN_SECONDS,
    });
  }

  private buildKakaoUsername(providerId: string): string {
    return `kakao_${providerId}`;
  }

  private getJwtSecret(): string {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined.');
    }
    return jwtSecret;
  }

  /**
   * 저장된 User 엔티티에서 비밀번호 필드를 제외한 공개 응답 객체를 만듭니다.
   */
  private mapUserToPublicWithoutPassword(user: User): UserWithoutPassword {
    return {
      id: user.id,
      username: user.username,
      provider: user.provider,
      providerId: user.providerId,
      email: user.email,
      nickname: user.nickname,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      version: user.version,
    };
  }
}
