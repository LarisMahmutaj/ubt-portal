import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/users/users.entity';
import { Course } from 'src/courses/courses.entity'

@Entity()
export class Ubtpost {
  constructor(values: Partial<Ubtpost> = {}) {
    Object.assign(this, values);
  }

  @PrimaryGeneratedColumn('uuid')
  ubtpostId: string;

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

  @Column()
  courseId: string;

  @ManyToOne((type) => Course, {
    nullable: true,
  })
  @JoinColumn({ name: "courseId" })
  course: Course;
}
