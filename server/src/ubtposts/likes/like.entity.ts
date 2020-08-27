import {
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  CreateDateColumn,
} from 'typeorm';
import { Ubtpost, CoursePost } from '../ubtposts.entity';
import { User } from 'src/users/users.entity';

@Entity()
export class UbtpostLike {
  constructor(values: Partial<UbtpostLike> = {}) {
    Object.assign(this, values);
  }

  @PrimaryColumn()
  postId: string;
  @ManyToOne((type) => Ubtpost, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'postId' })
  post: Ubtpost;

  @PrimaryColumn()
  userId: string;
  @ManyToOne((type) => User, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user: User;

  @CreateDateColumn()
  date: Date;
}

@Entity()
export class CoursePostLike {
  constructor(values: Partial<CoursePostLike> = {}) {
    Object.assign(this, values);
  }

  @PrimaryColumn()
  postId: string;

  @ManyToOne((type) => CoursePost, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'postId' })
  post: CoursePost;

  @PrimaryColumn()
  userId: string;

  @ManyToOne((type) => User, {
    nullable: false,
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @CreateDateColumn()
  date: Date;
}
