/** 카카오 /v2/user/me API 응답 중 사용하는 필드 */
export type KakaoUserProfile = {
  id: number;
  kakao_account?: {
    email?: string;
    profile?: {
      nickname?: string;
    };
  };
  properties?: {
    nickname?: string;
  };
};
