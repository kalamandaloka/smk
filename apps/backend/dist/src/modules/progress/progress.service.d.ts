import { PrismaService } from '../../prisma/prisma.service';
export declare class ProgressService {
    private prisma;
    constructor(prisma: PrismaService);
    completeLesson(lessonId: string, studentId: string): Promise<{
        id: string;
        lessonId: string;
        studentId: string;
        completedAt: Date;
    }>;
    myLessonProgress(studentId: string): Promise<({
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
        studentId: string;
        completedAt: Date;
    })[]>;
}
