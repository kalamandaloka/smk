import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UpdateCourseModuleDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}
