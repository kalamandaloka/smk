import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { SchoolsModule } from './modules/schools/schools.module';
import { AcademicYearsModule } from './modules/academic/academic-years.module';
import { SemestersModule } from './modules/academic/semesters.module';
import { ProgramsModule } from './modules/programs/programs.module';
import { DepartmentsModule } from './modules/departments/departments.module';
import { ClassesModule } from './modules/classes/classes.module';
import { CoursesModule } from './modules/courses/courses.module';
import { CourseModulesModule } from './modules/course-modules/course-modules.module';
import { LessonsModule } from './modules/lessons/lessons.module';
import { QuizzesModule } from './modules/quizzes/quizzes.module';
import { ProgressModule } from './modules/progress/progress.module';
import { RolesModule } from './modules/roles/roles.module';
import { MediaModule } from './modules/media/media.module';
import { ReportsModule } from './modules/reports/reports.module';
import { InteractiveModule } from './modules/interactive/interactive.module';
import { FoundationModule } from './modules/foundation/foundation.module';
import { PrincipalModule } from './modules/principal/principal.module';
import { StudentModule } from './modules/student/student.module';
import { AdminModule } from './modules/admin/admin.module';
import { SuperadminModule } from './modules/superadmin/superadmin.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    SchoolsModule,
    AcademicYearsModule,
    SemestersModule,
    ProgramsModule,
    DepartmentsModule,
    ClassesModule,
    CoursesModule,
    CourseModulesModule,
    LessonsModule,
    QuizzesModule,
    ProgressModule,
    RolesModule,
    MediaModule,
    ReportsModule,
    InteractiveModule,
    FoundationModule,
    PrincipalModule,
    StudentModule,
    AdminModule,
    SuperadminModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
