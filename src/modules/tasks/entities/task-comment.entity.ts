import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('task_comments')
export class TaskCommentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  comment: string;
}
