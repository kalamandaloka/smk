import { PrismaService } from '../../prisma/prisma.service';
import { CreateAcademicYearDto } from './dto/create-academic-year.dto';
export declare class AcademicYearsService {
    private prisma;
    constructor(prisma: PrismaService);
    list(): Promise<{
        id: string;
        label: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    create(dto: CreateAcademicYearDto): Promise<{
        id: string;
        label: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
