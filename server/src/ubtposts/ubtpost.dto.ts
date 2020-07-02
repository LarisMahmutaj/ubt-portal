export class CreateUbtpostDto {
  readonly content: string;
  readonly date: Date;
  readonly authorId?: string;
}

export class CommentDto {
  readonly content: string;
  readonly date: Date;
}
