import { IsString } from 'class-validator';

export class AssignCourseClassDto {
  @IsString()
  classId: string;
}
