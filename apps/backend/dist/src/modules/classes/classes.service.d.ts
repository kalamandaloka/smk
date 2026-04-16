import { PrismaService } from '../../prisma/prisma.service';
import { CreateClassDto } from './dto/create-class.dto';
export declare class ClassesService {
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
    listTeachers(classId: string): Promise<{
        id: string;
        createdAt: Date;
        teacher: {
            name: string;
            id: string;
            email: string;
        };
    }[]>;
    addTeacher(classId: string, teacherId: string): Promise<{
        classId: string;
        teacherId: string;
    }>;
    removeTeacher(classId: string, teacherId: string): Promise<{
        classId: string;
        teacherId: string;
    }>;
    listStudents(classId: string): Promise<{
        id: string;
        createdAt: Date;
        student: {
            name: string;
            id: string;
            email: string;
        };
    }[]>;
    addStudent(classId: string, studentId: string): Promise<{
        classId: string;
        studentId: string;
    }>;
    removeStudent(classId: string, studentId: string): Promise<{
        classId: string;
        studentId: string;
    }>;
    setHomeroomTeacher(classId: string, teacherId: string | null): Promise<{
        classId: string;
        teacherId: string | null;
    }>;
}
