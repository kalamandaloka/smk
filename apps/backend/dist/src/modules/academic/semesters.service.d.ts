import { PrismaService } from '../../prisma/prisma.service';
import { CreateSemesterDto } from './dto/create-semester.dto';
export declare class SemestersService {
    private prisma;
    constructor(prisma: PrismaService);
    list(): Promise<{
        id: string;
        label: string;
        academicYearId: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    create(dto: CreateSemesterDto): Promise<{
        id: string;
        label: string;
        academicYearId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
