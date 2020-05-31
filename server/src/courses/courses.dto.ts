import { Privacy } from './courses.entity'

export class CreateCourseDto {
    readonly name: string;
    readonly description: string;
    readonly date: Date;
    readonly ownerId: string;
    readonly privacy: Privacy
} 