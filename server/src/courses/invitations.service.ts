import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invitation, InvitationStatus } from './invitations.entity';
import { Repository } from 'typeorm';
import { CoursesService } from './courses.service';
import { CourseUser } from './courses.entity';

@Injectable()
export class InvitationsService {
  constructor(
    @InjectRepository(Invitation) private invitations: Repository<Invitation>,
    private readonly coursesService: CoursesService,
  ) {}

  async findAll() {
    return await this.invitations.find();
  }

  async findUserInvitations(userEmail: string) {
    return await this.invitations.find({
      where: { userEmail, status: InvitationStatus.PENDING },
      relations: ['course'],
    });
  }

  async findOne(userEmail: string, courseId: string) {
    return await this.invitations.findOne({ where: { userEmail, courseId } });
  }

  async create(invitation: Invitation) {
    const exists = !!(await this.findOne(
      invitation.userEmail,
      invitation.courseId,
    ));
    if (!exists) {
      await this.invitations.insert(invitation);
    }
  }

  async update(user, courseId: string, accepted) {
    const invitation = this.findOne(user.email, courseId);

    if (accepted) {
      const courseUser = new CourseUser({ userId: user.sub, courseId });
      await this.coursesService.createCourseUser(courseUser);
    }

    await this.invitations.update(
      { userEmail: user.email, courseId },
      {
        status: accepted
          ? InvitationStatus.ACCEPTED
          : InvitationStatus.DECLINED,
      },
    );
  }
}
