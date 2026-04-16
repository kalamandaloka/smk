import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { AssignUserDto } from './dto/assign-user.dto';
import { SetHomeroomTeacherDto } from './dto/set-homeroom-teacher.dto';
export declare class ClassesController {
    private readonly svc;
    constructor(svc: ClassesService);
    list(): Promise<({
        school: {
            id: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
        academicYear: {
            id: string;
            label: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        } | null;
        department: {
            id: string;
            name: string;
            schoolId: string;
            programId: string | null;
            createdAt: Date;
            updatedAt: Date;
        } | null;
        homeroomTeacher: {
            name: string;
            id: string;
            email: string;
        } | null;
        _count: {
            teachers: number;
            students: number;
        };
    } & {
        id: string;
        name: string;
        schoolId: string;
        departmentId: string | null;
        academicYearId: string | null;
        homeroomTeacherId: string | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    create(dto: CreateClassDto): Promise<{
        id: string;
        name: string;
        schoolId: string;
        departmentId: string | null;
        academicYearId: string | null;
        homeroomTeacherId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    listTeachers(id: string): Promise<{
        id: string;
        createdAt: Date;
        teacher: {
            name: string;
            id: string;
            email: string;
        };
    }[]>;
    addTeacher(id: string, dto: AssignUserDto): Promise<{
        classId: string;
        teacherId: string;
    }>;
    removeTeacher(id: string, userId: string): Promise<{
        classId: string;
        teacherId: string;
    }>;
    listStudents(id: string): Promise<{
        id: string;
        createdAt: Date;
        student: {
            name: string;
            id: string;
            email: string;
        };
    }[]>;
    addStudent(id: string, dto: AssignUserDto): Promise<{
        classId: string;
        studentId: string;
    }>;
    removeStudent(id: string, userId: string): Promise<{
        classId: string;
        studentId: string;
    }>;
    setHomeroom(id: string, dto: SetHomeroomTeacherDto): Promise<{
        classId: string;
        teacherId: string | null;
    }>;
}
