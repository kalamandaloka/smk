import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
export declare class DepartmentsController {
    private readonly svc;
    constructor(svc: DepartmentsService);
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
