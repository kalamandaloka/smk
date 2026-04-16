import { IsString, MinLength } from 'class-validator';

export class CreateProgramDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  schoolId: string;
}
