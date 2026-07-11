import { Injectable, UnauthorizedException } from '@nestjs/common';
import { KakaoUserProfile } from '@/modules/auth/types/kakao-user-profile.type';

const KAKAO_USER_ME_URL = 'https://kapi.kakao.com/v2/user/me';

/**
 * 카카오 OAuth Access Token 검증 및 사용자 프로필 조회
 */
@Injectable()
export class KakaoAuthService {
  async fetchUserProfile(kakaoAccessToken: string): Promise<KakaoUserProfile> {
    const response = await fetch(KAKAO_USER_ME_URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${kakaoAccessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });
    if (!response.ok) {
      throw new UnauthorizedException(
        '유효하지 않은 카카오 Access Token입니다.',
      );
    }
    const kakaoUserProfile = (await response.json()) as KakaoUserProfile;
    if (!kakaoUserProfile.id) {
      throw new UnauthorizedException(
        '카카오 사용자 정보를 확인할 수 없습니다.',
      );
    }
    return kakaoUserProfile;
  }

  extractEmail(kakaoUserProfile: KakaoUserProfile): string | null {
    return kakaoUserProfile.kakao_account?.email ?? null;
  }

  extractNickname(kakaoUserProfile: KakaoUserProfile): string | null {
    return (
      kakaoUserProfile.kakao_account?.profile?.nickname ??
      kakaoUserProfile.properties?.nickname ??
      null
    );
  }
}
