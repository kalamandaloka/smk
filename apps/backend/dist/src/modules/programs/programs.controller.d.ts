import { ProgramsService } from './programs.service';
import { CreateProgramDto } from './dto/create-program.dto';
export declare class ProgramsController {
    private readonly svc;
    constructor(svc: ProgramsService);
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
