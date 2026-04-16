import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { Permissions } from '../../common/decorators/permissions.decorator';
import { ProgressService } from './progress.service';

@Controller('progress')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class ProgressController {
  constructor(private readonly svc: ProgressService) {}

  @Post('lessons/:lessonId/complete')
  @Permissions('progress.write')
  async completeLesson(@Param('lessonId') lessonId: string, @Req() req: any) {
    return this.svc.completeLesson(lessonId, req.user.sub);
  }

  @Get('me/lessons')
  @Permissions('progress.read')
  async myLessonProgress(@Req() req: any) {
    return this.svc.myLessonProgress(req.user.sub);
  }
}
