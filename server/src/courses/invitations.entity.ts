import {
  Entity,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Column,
} from 'typeorm';
import { Course } from './courses.entity';

export enum InvitationStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
}

@Entity()
export class Invitation {
  constructor(values: Partial<Invitation> = {}) {
    Object.assign(this, values);
  }

  @PrimaryColumn()
  userEmail: string;

  @PrimaryColumn()
  courseId: string;

  @ManyToOne((type) => Course, {
    primary: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'courseId' })
  course: Course;

  @CreateDateColumn()
  dateInvited: Date;

  @Column({
    type: 'enum',
    enum: InvitationStatus,
    default: InvitationStatus.PENDING,
  })
  status: InvitationStatus;
}
