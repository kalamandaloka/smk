import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateCourseModuleDto {
  @IsString()
  courseId: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}
