export const CATEGORIES = [
  '생활',
  '취미',
  '일',
  '학교',
  '여행',
  '미분류',
] as const;

export type Category = (typeof CATEGORIES)[number];

/** class-validator @IsIn 실패 시 허용 값을 문장에 포함 */
export const CATEGORY_ALLOWED_VALUES_MESSAGE: string = `category는 다음 값 중 하나여야 합니다: ${CATEGORIES.join(', ')}`;

/** 쿼리 문자열이 허용된 카테고리인지 검사 (TypeORM where 타입 좁히기용) */
export function isCategory(value: string): value is Category {
  return (CATEGORIES as readonly string[]).includes(value);
}
