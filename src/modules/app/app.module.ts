import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from '../tasks/task.module';
import { UserModule } from '../users/user.module';

@Module({
  imports: [
    // 1. ConfigModule 설정: .env 파일 로드
    ConfigModule.forRoot({
      isGlobal: true, // 전역으로 ConfigService 사용 가능
      envFilePath: `.env/${process.env.NODE_ENV || 'development'}.env`,
      // envFilePath: ['.env.dev', '.env'], // 필요에 따라 환경 파일 지정
    }),

    // 2. TypeOrmModule 비동기 설정: ConfigService의 환경 변수 주입
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // ConfigService를 가져오기 위해 ConfigModule 주입
      inject: [ConfigService], // ConfigService 인스턴스를 주입받음

      // 실제 데이터베이스와 연결을 하기 위한 설정을 수행하는 팩토리 함수
      useFactory: (config: ConfigService) => ({
        type: config.get<string>('DB_TYPE') as 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_DATABASE'),

        // 엔티티 로드 설정
        autoLoadEntities: true,

        // 데이터베이스 스키마 동기화 (개발 시 편리) // ! **운영 시 절대 금지**
        synchronize: config.get('synchronize') === 'true',
        // synchronize: process.env.NODE_ENV === 'development',
      }),
    }),

    TaskModule,

    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
