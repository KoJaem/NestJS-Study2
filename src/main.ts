import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 전역 유효성 검사 파이프 적용
  // whitelist: true - DTO에 정의되지 않은 속성은 자동으로 제거
  // forbidNonWhitelisted: true - DTO에 정의되지 않은 속성이 있으면 에러 발생
  // transform: true - 요청 데이터를 DTO 클래스 인스턴스로 자동 변환
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ?? 4000);
}

bootstrap();
