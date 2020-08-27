import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from 'src/users/users.entity';
import { Course } from 'src/courses/courses.entity';

export abstract class Post {
  @PrimaryGeneratedColumn('uuid')
  postId: string;

  @Column('varchar', { length: 5000 })
  content: string;

  @CreateDateColumn()
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
}

@Entity()
export class CoursePost extends Post {
  constructor(values: Partial<CoursePost> = {}) {
    super();
    Object.assign(this, values);
  }
  @Column()
  courseId: string;

  @ManyToOne((type) => Course, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'courseId' })
  course: Course;
}
