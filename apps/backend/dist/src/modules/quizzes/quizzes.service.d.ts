import { PrismaService } from '../../prisma/prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { SubmitQuizDto } from './dto/submit-quiz.dto';
export declare class QuizzesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateQuizDto): Promise<{
        questions: ({
            options: {
                id: string;
                questionId: string;
                text: string;
                isCorrect: boolean;
                createdAt: Date;
            }[];
        } & {
            id: string;
            quizId: string;
            prompt: string;
            type: import(".prisma/client").$Enums.QuestionType;
            order: number;
            createdAt: Date;
        })[];
    } & {
        id: string;
        lessonId: string;
        passingScore: number;
        maxAttempts: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    get(id: string): Promise<{
        questions: ({
            options: {
                id: string;
                questionId: string;
                text: string;
                isCorrect: boolean;
                createdAt: Date;
            }[];
        } & {
            id: string;
            quizId: string;
            prompt: string;
            type: import(".prisma/client").$Enums.QuestionType;
            order: number;
            createdAt: Date;
        })[];
    } & {
        id: string;
        lessonId: string;
        passingScore: number;
        maxAttempts: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    startAttempt(quizId: string, studentId: string): Promise<{
        id: string;
        quizId: string;
        studentId: string;
        startedAt: Date;
        submittedAt: Date | null;
        score: number;
        passed: boolean;
    }>;
    submitAttempt(attemptId: string, studentId: string, dto: SubmitQuizDto): Promise<{
        score: number;
        passed: boolean;
    }>;
    getAttempt(attemptId: string, studentId: string): Promise<{
        quiz: {
            lesson: {
                id: string;
                moduleId: string;
                title: string;
                type: import(".prisma/client").$Enums.LessonType;
                order: number;
                article: string | null;
                videoUrl: string | null;
                documentUrl: string | null;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            lessonId: string;
            passingScore: number;
            maxAttempts: number;
            createdAt: Date;
            updatedAt: Date;
        };
        answers: {
            id: string;
            attemptId: string;
            questionId: string;
            optionId: string;
            createdAt: Date;
        }[];
    } & {
        id: string;
        quizId: string;
        studentId: string;
        startedAt: Date;
        submittedAt: Date | null;
        score: number;
        passed: boolean;
    }>;
}
