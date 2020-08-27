import { Privacy, CoursePermission, Role } from './courses.entity';

export class CreateCourseDto {
  readonly name: string;
  readonly description: string;
  readonly ownerId: string;
  readonly privacy: Privacy;
}

export class CreateCoursePostDto {
  readonly content: string;
}

export class CreateCourseUserDto {
  readonly courseId: string;
  readonly userId: string;
  readonly coursePermission: CoursePermission;
  readonly role: Role;
}
