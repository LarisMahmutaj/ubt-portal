export class RegisterUserDto {
  readonly fullname: string;
  readonly email: string;
  readonly password: string;
}

export class SearchUsersDto {
  readonly text: string;
}
