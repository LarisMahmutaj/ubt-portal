import {
  Entity,
  ManyToOne,
  JoinColumn,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { Ubtpost, CoursePost } from '../ubtposts.entity';
import { User } from 'src/users/users.entity';

@Entity()
export class UbtpostComment {
  constructor(values: Partial<UbtpostComment> = {}) {
    Object.assign(this, values);
  }

  @PrimaryGeneratedColumn('uuid')
  commentId: string;

  @Column()
  postId: string;

  @ManyToOne((type) => Ubtpost, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'postId' })
  post: Ubtpost;

  @Column()
  userId: string;

  @ManyToOne((type) => User, {
    nullable: false,
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column('varchar', { length: 5000 })
  content: string;

  @CreateDateColumn()
  date: Date;
}

@Entity()
export class CoursePostComment {
  constructor(values: Partial<CoursePostComment> = {}) {
    Object.assign(this, values);
  }

  @PrimaryGeneratedColumn('uuid')
  commentId: string;

  @Column()
  postId: string;

  @ManyToOne((type) => CoursePost, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'postId' })
  post: CoursePost;

  @Column()
  userId: string;

  @ManyToOne((type) => User, {
    nullable: false,
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column('varchar', { length: 5000 })
  content: string;

  @CreateDateColumn()
  date: Date;
}
