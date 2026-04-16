import { PrismaService } from '../../prisma/prisma.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
export declare class DepartmentsService {
    private prisma;
    constructor(prisma: PrismaService);
    list(): Promise<({
        school: {
            id: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
        program: {
            id: string;
            name: string;
            schoolId: string;
            createdAt: Date;
            updatedAt: Date;
        } | null;
    } & {
        id: string;
        name: string;
        schoolId: string;
        programId: string | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    create(dto: CreateDepartmentDto): Promise<{
        id: string;
        name: string;
        schoolId: string;
        programId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
