import { SemestersService } from './semesters.service';
import { CreateSemesterDto } from './dto/create-semester.dto';
export declare class SemestersController {
    private readonly svc;
    constructor(svc: SemestersService);
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
