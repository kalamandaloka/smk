import { InteractiveService } from './interactive.service';
export declare class InteractiveController {
    private readonly svc;
    constructor(svc: InteractiveService);
    launchSession(lessonId: string, req: any): Promise<{
        id: string;
        lessonId: string;
        userId: string;
        launchedAt: Date;
        status: string;
    }>;
    submitResult(sessionId: string, body: any): Promise<{
        id: string;
        lessonId: string;
        userId: string;
        launchedAt: Date;
        status: string;
    }>;
    getSession(sessionId: string): Promise<({
        results: {
            id: string;
            sessionId: string;
            data: import(".prisma/client").Prisma.JsonValue;
            createdAt: Date;
        }[];
    } & {
        id: string;
        lessonId: string;
        userId: string;
        launchedAt: Date;
        status: string;
    }) | null>;
}
