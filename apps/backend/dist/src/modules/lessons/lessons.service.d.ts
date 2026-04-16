import { PrismaService } from '../../prisma/prisma.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
export declare class LessonsService {
    private prisma;
    constructor(prisma: PrismaService);
    listByModule(moduleId: string): Promise<({
        quiz: {
            id: string;
            lessonId: string;
            passingScore: number;
            maxAttempts: number;
            createdAt: Date;
            updatedAt: Date;
        } | null;
    } & {
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
    })[]>;
    create(dto: CreateLessonDto): Promise<{
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
    }>;
    get(id: string): Promise<({
        quiz: ({
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
        }) | null;
    } & {
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
    }) | null>;
    update(id: string, dto: UpdateLessonDto): Promise<{
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
    }>;
    delete(id: string): Promise<{
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
    }>;
}
