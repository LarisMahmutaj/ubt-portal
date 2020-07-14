import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import { User } from 'src/users/users.entity';
// import { Post } from '../ubtposts/ubtposts.entity';
const Post = require('../ubtposts/ubtposts.entity');

export enum Privacy {
  PRIVATE = 'private',
  PUBLIC = 'public',
}

export enum CoursePermission {
  NONE = 'none',
  READ = 'read',
  WRITE = 'write',
}

export enum Role {
  MEMBER = 'member',
  ADMIN = 'admin',
  OWNER = 'owner',
}

@Entity()
export class Course {
  constructor(values: Partial<Course> = {}) {
    Object.assign(this, values);
  }

  @PrimaryGeneratedColumn('uuid')
  courseId: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  date: Date;

  @Column()
  ownerId: string;

  @ManyToOne((type) => User, {
    nullable: false,
  })
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @Column({
    type: 'enum',
    enum: Privacy,
    default: Privacy.PRIVATE,
  })
  privacy: Privacy;
}

@Entity()
export class CourseUser {
  constructor(values: Partial<CourseUser> = {}) {
    Object.assign(this, values);
  }

  @PrimaryColumn()
  userId: string;

  @ManyToOne((type) => User, {
    primary: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @PrimaryColumn()
  courseId: string;

  @ManyToOne((type) => Course, {
    primary: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'courseId' })
  course: Course;

  @Column({
    type: 'enum',
    enum: CoursePermission,
    default: CoursePermission.NONE,
  })
  coursePermission: CoursePermission;

  @Column()
  role: string;
}
