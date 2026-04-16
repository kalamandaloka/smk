import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateDepartmentDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  schoolId: string;

  @IsOptional()
  @IsString()
  programId?: string;
}
