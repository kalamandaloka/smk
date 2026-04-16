import { PrismaService } from '../../prisma/prisma.service';
export declare class InteractiveService {
    private prisma;
    constructor(prisma: PrismaService);
    launchSession(lessonId: string, userId: string): Promise<{
        id: string;
        lessonId: string;
        userId: string;
        launchedAt: Date;
        status: string;
    }>;
    submitResult(sessionId: string, data: any): Promise<{
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
