import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
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

  @Column('varchar', { length: 1000 })
  content: string;

  @Column()
  date: Date;

  @OneToOne((type) => User)
  @JoinColumn()
  user: User;
}
