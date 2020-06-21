import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/users/users.entity';
import { Course } from 'src/courses/courses.entity';

export abstract class Post {
  @PrimaryGeneratedColumn('uuid')
  postId: string;

  @Column('varchar', { length: 5000 })
  content: string;

  @Column()
  date: Date;

  @Column()
  authorId: string;

  @ManyToOne((type) => User, {
    nullable: false,
  })
  @JoinColumn({ name: 'authorId' })
  author: User;
}

@Entity()
export class Ubtpost extends Post {
  constructor(values: Partial<Ubtpost> = {}) {
    super();
    Object.assign(this, values);
  }

  // @PrimaryGeneratedColumn('uuid')
  // ubtpostId: string;

  // @Column('varchar', { length: 5000 })
  // content: string;

  // @Column()
  // date: Date;

  // @Column()
  // authorId: string;

  // @ManyToOne((type) => User, {
  //   nullable: false,
  // })
  // @JoinColumn({ name: 'authorId' })
  // author: User;

  // @Column({ nullable: true })
  // courseId: string;

  // @ManyToOne((type) => Course, {
  //   nullable: true,
  // })
  // @JoinColumn({ name: 'courseId' })
  // course: Course;
}

@Entity()
export class CoursePost extends Post {
  constructor(values: Partial<CoursePost> = {}) {
    super();
    Object.assign(this, values);
  }
  @Column({ nullable: true })
  courseId: string;

  @ManyToOne((type) => Course, {
    nullable: true,
  })
  @JoinColumn({ name: 'courseId' })
  course: Course;
}
