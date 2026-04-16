import { Controller, Post, Param, Body, UseGuards, Req, Get } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { InteractiveService } from './interactive.service';

@Controller('interactive')
@UseGuards(JwtAuthGuard)
export class InteractiveController {
  constructor(private readonly svc: InteractiveService) {}

  @Post('launch/:lessonId')
  async launchSession(@Param('lessonId') lessonId: string, @Req() req: any) {
    return this.svc.launchSession(lessonId, req.user.sub);
  }

  @Post('session/:sessionId/result')
  async submitResult(@Param('sessionId') sessionId: string, @Body() body: any) {
    return this.svc.submitResult(sessionId, body.data);
  }

  @Get('session/:sessionId')
  async getSession(@Param('sessionId') sessionId: string) {
    return this.svc.getSession(sessionId);
  }
}
