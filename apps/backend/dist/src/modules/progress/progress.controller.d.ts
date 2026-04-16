import { ProgressService } from './progress.service';
export declare class ProgressController {
    private readonly svc;
    constructor(svc: ProgressService);
    completeLesson(lessonId: string, req: any): Promise<{
        id: string;
        lessonId: string;
        studentId: string;
        completedAt: Date;
    }>;
    myLessonProgress(req: any): Promise<({
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
