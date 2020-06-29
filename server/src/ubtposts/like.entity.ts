import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import { Ubtpost, CoursePost } from './ubtposts.entity';
import { User } from 'src/users/users.entity';

@Entity()
export class Like {
  constructor(values: Partial<Like> = {}) {
    Object.assign(this, values);
  }

  @PrimaryColumn()
  postId: string;
  @ManyToOne((type) => Ubtpost || CoursePost, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'postId' })
  post: Ubtpost | CoursePost;

  @PrimaryColumn()
  userId: string;
  @ManyToOne((type) => User, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user: User;
}
