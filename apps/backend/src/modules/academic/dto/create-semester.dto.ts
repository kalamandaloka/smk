import { IsString, MinLength } from 'class-validator';

export class CreateSemesterDto {
  @IsString()
  @MinLength(2)
  label: string;

  @IsString()
  academicYearId: string;
}
