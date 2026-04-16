import { IsOptional, IsString } from 'class-validator';

export class SetHomeroomTeacherDto {
  @IsOptional()
  @IsString()
  userId?: string | null;
}
