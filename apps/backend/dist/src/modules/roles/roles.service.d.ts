import { PrismaService } from '../../prisma/prisma.service';
export declare class RolesService {
    private prisma;
    constructor(prisma: PrismaService);
    listRoles(): Promise<{
        id: string;
        code: string;
        name: string;
        createdAt: Date;
    }[]>;
    listPermissions(): Promise<{
        id: string;
        code: string;
        name: string;
        createdAt: Date;
    }[]>;
}
