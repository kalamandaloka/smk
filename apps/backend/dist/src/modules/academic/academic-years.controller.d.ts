import { AcademicYearsService } from './academic-years.service';
import { CreateAcademicYearDto } from './dto/create-academic-year.dto';
export declare class AcademicYearsController {
    private readonly svc;
    constructor(svc: AcademicYearsService);
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
