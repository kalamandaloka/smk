import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { Permissions } from '../../common/decorators/permissions.decorator';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { SubmitQuizDto } from './dto/submit-quiz.dto';

@Controller()
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class QuizzesController {
  constructor(private readonly svc: QuizzesService) {}

  @Post('quizzes')
  @Permissions('quiz.manage')
  async create(@Body() dto: CreateQuizDto) {
    return this.svc.create(dto);
  }

  @Get('quizzes/:id')
  @Permissions('quiz.manage')
  async get(@Param('id') id: string) {
    return this.svc.get(id);
  }

  @Post('quizzes/:id/attempts')
  @Permissions('quiz.attempt')
  async startAttempt(@Param('id') quizId: string, @Req() req: any) {
    return this.svc.startAttempt(quizId, req.user.sub);
  }

  @Post('quiz-attempts/:id/submit')
  @Permissions('quiz.attempt')
  async submit(@Param('id') attemptId: string, @Req() req: any, @Body() dto: SubmitQuizDto) {
    return this.svc.submitAttempt(attemptId, req.user.sub, dto);
  }

  @Get('quiz-attempts/:id')
  @Permissions('quiz.attempt')
  async getAttempt(@Param('id') attemptId: string, @Req() req: any) {
    return this.svc.getAttempt(attemptId, req.user.sub);
  }
}
