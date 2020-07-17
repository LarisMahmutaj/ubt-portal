export class RegisterUserDto {
  readonly fullname: string;
  readonly email: string;
  readonly password: string;
  readonly date: Date;
}

export class SearchUsersDto {
  readonly text: string;
}
