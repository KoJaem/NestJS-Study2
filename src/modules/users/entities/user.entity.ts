import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Column } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ name: 'service_agreed' }) // 데이터베이스는 보편적으로 스네이크 케이스를 사용하기 때문에 Column 데코레이터에 name 속성을 사용하여 데이터베이스 컬럼 이름을 지정해준다.
  serviceAgreed: boolean;

  @Column({ name: 'privacy_agreed' })
  privacyAgreed: boolean;

  @Column({ name: 'marketing_agreed' })
  marketingAgreed: boolean;
}
