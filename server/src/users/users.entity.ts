import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  constructor(values: Partial<User> = {}) {
    Object.assign(this, values);
  }

  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  date: Date;
}
