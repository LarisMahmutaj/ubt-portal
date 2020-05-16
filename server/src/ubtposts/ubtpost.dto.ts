import { User } from '../users/users.entity';

export class CreateUbtpostDto {
  readonly title: string;
  readonly content: string;
  readonly date: Date;
  readonly authorId: string;
}
