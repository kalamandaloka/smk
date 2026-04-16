import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateAcademicYearDto {
  @IsString()
  @MinLength(4)
  label: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
