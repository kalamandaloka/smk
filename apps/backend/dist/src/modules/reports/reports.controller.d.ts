import { ReportsService } from './reports.service';
export declare class ReportsController {
    private readonly svc;
    constructor(svc: ReportsService);
    getQuizGrades(): Promise<({
        quiz: {
            lesson: {
                title: string;
            };
        } & {
            id: string;
            lessonId: string;
            passingScore: number;
            maxAttempts: number;
            createdAt: Date;
            updatedAt: Date;
        };
        student: {
            name: string;
            id: string;
            email: string;
        };
    } & {
        id: string;
        quizId: string;
        studentId: string;
        startedAt: Date;
        submittedAt: Date | null;
        score: number;
        passed: boolean;
    })[]>;
    getLessonProgress(): Promise<({
        lesson: {
            id: string;
            title: string;
            type: import(".prisma/client").$Enums.LessonType;
        };
        student: {
            name: string;
            id: string;
            email: string;
        };
    } & {
        id: string;
        lessonId: string;
        studentId: string;
        completedAt: Date;
    })[]>;
}
