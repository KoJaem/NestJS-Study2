import { User } from '@/modules/user/entities/user.entity';

/** API 응답 등 외부로 노출할 때 사용하는 사용자 형태(비밀번호 제외) */
export type UserWithoutPassword = Omit<User, 'password'>;
