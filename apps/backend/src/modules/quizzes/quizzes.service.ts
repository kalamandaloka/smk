import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { SubmitQuizDto } from './dto/submit-quiz.dto';

@Injectable()
export class QuizzesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateQuizDto) {
    if (!dto.questions || dto.questions.length === 0) throw new BadRequestException('questions required');
    return this.prisma.quiz.create({
      data: {
        lessonId: dto.lessonId,
        passingScore: dto.passingScore ?? 0,
        maxAttempts: dto.maxAttempts ?? 0,
        questions: {
          create: dto.questions.map((q, idx) => ({
            prompt: q.prompt,
            order: q.order ?? idx,
            options: {
              create: q.options.map((o) => ({
                text: o.text,
                isCorrect: o.isCorrect ?? false,
              })),
            },
          })),
        },
      },
      include: { questions: { include: { options: true }, orderBy: { order: 'asc' } } },
    });
  }

  async get(id: string) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
      include: { questions: { include: { options: true }, orderBy: { order: 'asc' } } },
    });
    if (!quiz) throw new NotFoundException();
    return quiz;
  }

  async startAttempt(quizId: string, studentId: string) {
    const quiz = await this.prisma.quiz.findUnique({ where: { id: quizId } });
    if (!quiz) throw new NotFoundException();
    if (quiz.maxAttempts > 0) {
      const attempts = await this.prisma.quizAttempt.count({ where: { quizId, studentId } });
      if (attempts >= quiz.maxAttempts) throw new ForbiddenException('max attempts reached');
    }
    return this.prisma.quizAttempt.create({ data: { quizId, studentId } });
  }

  async submitAttempt(attemptId: string, studentId: string, dto: SubmitQuizDto) {
    const attempt = await this.prisma.quizAttempt.findUnique({
      where: { id: attemptId },
      include: {
        quiz: {
          include: {
            questions: { include: { options: true }, orderBy: { order: 'asc' } },
          },
        },
      },
    });
    if (!attempt) throw new NotFoundException();
    if (attempt.studentId !== studentId) throw new ForbiddenException();
    if (attempt.submittedAt) throw new BadRequestException('already submitted');

    const questionById = new Map(attempt.quiz.questions.map((q) => [q.id, q]));
    const answers = dto.answers ?? [];
    const filtered = answers.filter((a) => questionById.has(a.questionId));

    const correctByQuestion = new Map<string, string>();
    for (const q of attempt.quiz.questions) {
      const correct = q.options.find((o) => o.isCorrect);
      if (correct) correctByQuestion.set(q.id, correct.id);
    }

    let correctCount = 0;
    for (const a of filtered) {
      const correctOptionId = correctByQuestion.get(a.questionId);
      if (correctOptionId && correctOptionId === a.optionId) correctCount += 1;
    }
    const total = attempt.quiz.questions.length;
    const score = total === 0 ? 0 : Math.round((correctCount / total) * 100);
    const passed = score >= attempt.quiz.passingScore;

    await this.prisma.$transaction(async (tx) => {
      await tx.quizAnswer.createMany({
        data: filtered.map((a) => ({ attemptId, questionId: a.questionId, optionId: a.optionId })),
        skipDuplicates: true,
      });
      await tx.quizAttempt.update({
        where: { id: attemptId },
        data: { submittedAt: new Date(), score, passed },
      });
    });

    return { score, passed };
  }

  async getAttempt(attemptId: string, studentId: string) {
    const attempt = await this.prisma.quizAttempt.findUnique({
      where: { id: attemptId },
      include: { quiz: { include: { lesson: true } }, answers: true },
    });
    if (!attempt) throw new NotFoundException();
    if (attempt.studentId !== studentId) throw new ForbiddenException();
    return attempt;
  }
}
