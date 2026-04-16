import { CourseModulesService } from './course-modules.service';
import { CreateCourseModuleDto } from './dto/create-course-module.dto';
import { UpdateCourseModuleDto } from './dto/update-course-module.dto';
export declare class CourseModulesController {
    private readonly svc;
    constructor(svc: CourseModulesService);
    listByCourse(courseId: string): Promise<{
        id: string;
        courseId: string;
        title: string;
        order: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    create(dto: CreateCourseModuleDto): Promise<{
        id: string;
        courseId: string;
        title: string;
        order: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, dto: UpdateCourseModuleDto): Promise<{
        id: string;
        courseId: string;
        title: string;
        order: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    delete(id: string): Promise<{
        id: string;
        courseId: string;
        title: string;
        order: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
