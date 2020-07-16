import {
  Controller,
  Get,
  Request,
  UseGuards,
  Patch,
  Body,
  Param,
} from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { Invitation } from './invitations.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateInvitationDto } from './invitations.dto';

@UseGuards(JwtAuthGuard)
@Controller('invitations')
export class InvitationsController {
  constructor(private readonly invitationsService: InvitationsService) {}
  @Get()
  async getUserInvitations(@Request() req): Promise<Invitation[]> {
    return await this.invitationsService.findUserInvitations(req.user.email);
  }

  @Patch(':courseId')
  async updateInvitation(
    @Param('courseId') courseId: string,
    @Request() req,
    @Body() { accepted }: UpdateInvitationDto,
  ) {
    return await this.invitationsService.update(req.user, courseId, accepted);
  }
}
