import { PrismaService } from '../../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        name: string;
        id: string;
        email: string;
        isActive: boolean;
        createdAt: Date;
        userRoles: {
            role: {
                name: string;
                code: string;
            };
        }[];
        school: {
            name: string;
            id: string;
        } | null;
    }[]>;
    findOne(id: string): Promise<{
        name: string;
        id: string;
        email: string;
        isActive: boolean;
        createdAt: Date;
        userRoles: {
            role: {
                name: string;
                id: string;
                code: string;
            };
        }[];
        school: {
            name: string;
            id: string;
        } | null;
        taughtClasses: {
            class: {
                name: string;
                id: string;
            };
        }[];
        studentClasses: {
            class: {
                name: string;
                id: string;
            };
        }[];
        homeroomForClasses: {
            name: string;
            id: string;
        }[];
    }>;
    create(input: {
        email: string;
        name: string;
        password: string;
        roleCode?: string;
        roleCodes?: string[];
        schoolId?: string;
        isActive?: boolean;
    }): Promise<{
        id: string;
    }>;
    update(id: string, input: {
        email?: string;
        name?: string;
        password?: string;
        isActive?: boolean;
        schoolId?: string | null;
    }): Promise<{
        id: string;
    }>;
    delete(id: string): Promise<{
        id: string;
    }>;
    setRoles(userId: string, roleCodes: string[]): Promise<{
        userId: string;
        roleCodes: string[];
    }>;
}
