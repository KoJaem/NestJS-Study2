import { UserWithoutPassword } from './user-without-password.type';

export type LoginUser = Pick<UserWithoutPassword, 'id' | 'username'>;

export type LoginResponse = { access_token: string };

export type AuthTokenResponse = {
  accessToken: string;
  user: UserWithoutPassword;
};
