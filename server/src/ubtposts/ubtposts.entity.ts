import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/users/users.entity';

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
}
