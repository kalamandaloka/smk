import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { AssignCourseClassDto } from './dto/assign-course-class.dto';
export declare class CoursesController {
    private readonly svc;
    constructor(svc: CoursesService);
    list(): Promise<({
        school: {
            id: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
        department: {
            id: string;
            name: string;
            schoolId: string;
            programId: string | null;
            createdAt: Date;
            updatedAt: Date;
        } | null;
        assignedClasses: ({
            class: {
                id: string;
                name: string;
                schoolId: string;
                departmentId: string | null;
                academicYearId: string | null;
                homeroomTeacherId: string | null;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            courseId: string;
            classId: string;
            createdAt: Date;
        })[];
    } & {
        id: string;
        title: string;
        slug: string;
        description: string | null;
        status: import(".prisma/client").$Enums.PublicationStatus;
        schoolId: string;
        departmentId: string | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    create(dto: CreateCourseDto): Promise<{
        id: string;
        title: string;
        slug: string;
        description: string | null;
        status: import(".prisma/client").$Enums.PublicationStatus;
        schoolId: string;
        departmentId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    get(id: string): Promise<{
        modules: {
            id: string;
            courseId: string;
            title: string;
            order: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
        assignedClasses: ({
            class: {
                id: string;
                name: string;
                schoolId: string;
                departmentId: string | null;
                academicYearId: string | null;
                homeroomTeacherId: string | null;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            courseId: string;
            classId: string;
            createdAt: Date;
        })[];
    } & {
        id: string;
        title: string;
        slug: string;
        description: string | null;
        status: import(".prisma/client").$Enums.PublicationStatus;
        schoolId: string;
        departmentId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, dto: UpdateCourseDto): Promise<{
        id: string;
        title: string;
        slug: string;
        description: string | null;
        status: import(".prisma/client").$Enums.PublicationStatus;
        schoolId: string;
        departmentId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    listAssignedClasses(id: string): Promise<({
        class: {
            id: string;
            name: string;
            schoolId: string;
            departmentId: string | null;
            academicYearId: string | null;
            homeroomTeacherId: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        courseId: string;
        classId: string;
        createdAt: Date;
    })[]>;
    assignToClass(id: string, dto: AssignCourseClassDto): Promise<{
        courseId: string;
        classId: string;
    }>;
    unassignFromClass(id: string, classId: string): Promise<{
        courseId: string;
        classId: string;
    }>;
}
