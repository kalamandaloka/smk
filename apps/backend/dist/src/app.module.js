"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_service_1 = require("./prisma/prisma.service");
const users_module_1 = require("./modules/users/users.module");
const auth_module_1 = require("./modules/auth/auth.module");
const schools_module_1 = require("./modules/schools/schools.module");
const academic_years_module_1 = require("./modules/academic/academic-years.module");
const semesters_module_1 = require("./modules/academic/semesters.module");
const programs_module_1 = require("./modules/programs/programs.module");
const departments_module_1 = require("./modules/departments/departments.module");
const classes_module_1 = require("./modules/classes/classes.module");
const courses_module_1 = require("./modules/courses/courses.module");
const course_modules_module_1 = require("./modules/course-modules/course-modules.module");
const lessons_module_1 = require("./modules/lessons/lessons.module");
const quizzes_module_1 = require("./modules/quizzes/quizzes.module");
const progress_module_1 = require("./modules/progress/progress.module");
const roles_module_1 = require("./modules/roles/roles.module");
const media_module_1 = require("./modules/media/media.module");
const reports_module_1 = require("./modules/reports/reports.module");
const interactive_module_1 = require("./modules/interactive/interactive.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            schools_module_1.SchoolsModule,
            academic_years_module_1.AcademicYearsModule,
            semesters_module_1.SemestersModule,
            programs_module_1.ProgramsModule,
            departments_module_1.DepartmentsModule,
            classes_module_1.ClassesModule,
            courses_module_1.CoursesModule,
            course_modules_module_1.CourseModulesModule,
            lessons_module_1.LessonsModule,
            quizzes_module_1.QuizzesModule,
            progress_module_1.ProgressModule,
            roles_module_1.RolesModule,
            media_module_1.MediaModule,
            reports_module_1.ReportsModule,
            interactive_module_1.InteractiveModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, prisma_service_1.PrismaService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map