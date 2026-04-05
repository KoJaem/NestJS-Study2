import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/http-exception.filter';
import { API_GLOBAL_PREFIX } from './common/constants/api-global-prefix.constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(API_GLOBAL_PREFIX);

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

  const config = new DocumentBuilder()
    .setTitle('Nest.js API 문서 제목')
    .setDescription('JSON 구조 [링크](/api-docs-json)')
    .setVersion('1.0')
    // .addTag('cats')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  // 문서 UI는 접두사 없이 /api-docs 유지 (스펙 내 경로는 전역 접두사 반영)
  SwaggerModule.setup('api-docs', app, documentFactory, {
    useGlobalPrefix: false,
  });

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.PORT ?? 4000);
}

bootstrap().catch((error) => {
  console.error('Program exited with error:', error);
  process.exit(1);
});
