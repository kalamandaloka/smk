import { PrismaService } from '../../prisma/prisma.service';
import { CreateProgramDto } from './dto/create-program.dto';
export declare class ProgramsService {
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
    } & {
        id: string;
        name: string;
        schoolId: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    create(dto: CreateProgramDto): Promise<{
        id: string;
        name: string;
        schoolId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
