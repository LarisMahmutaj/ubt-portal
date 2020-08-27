import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  constructor(values: Partial<User> = {}) {
    Object.assign(this, values);
  }

  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column()
  fullname: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @CreateDateColumn()
  date: Date;

  @Column({ default: false })
  active: boolean;
}
