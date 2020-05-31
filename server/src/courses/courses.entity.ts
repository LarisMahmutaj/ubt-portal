import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/users/users.entity';

export enum Privacy {
  PRIVATE = "private",
  PUBLIC = "public"
}

@Entity()
export class Course{
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

  @Column({
    type: 'enum',
    enum: Privacy,
    default: Privacy.PRIVATE
  })
  privacy: Privacy

  @ManyToOne((type) => User, {
    nullable: false,
  })
  @JoinColumn({name: 'ownerId'})
  owner: User;
}