import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tasks')
export class TaskEntity {
  // @PrimaryGeneratedColumn('uuid') // uuid 로 설정할경우, id 의 타입은 string 이 되어야 한다.
  @PrimaryGeneratedColumn() // uuid 로 설정할경우, id 의 타입은 string 이 되어야 한다.
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  category: string;

  @Column()
  thumbnail: string;
}
