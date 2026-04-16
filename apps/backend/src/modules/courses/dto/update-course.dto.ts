import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateCourseDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  slug?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  status?: 'DRAFT' | 'PUBLISHED';

  @IsOptional()
  @IsString()
  schoolId?: string;

  @IsOptional()
  @IsString()
  departmentId?: string;
}
