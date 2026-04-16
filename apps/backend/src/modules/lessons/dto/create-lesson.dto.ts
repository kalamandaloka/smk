import { IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator';

const LESSON_TYPES = [
  'ARTICLE',
  'VIDEO',
  'DOCUMENT',
  'QUIZ',
  'INTERACTIVE_3D',
  'AR_ACTIVITY',
  'VR_ACTIVITY',
  'MR_ACTIVITY',
] as const;

export class CreateLessonDto {
  @IsString()
  moduleId: string;

  @IsString()
  title: string;

  @IsString()
  @IsIn(LESSON_TYPES)
  type: (typeof LESSON_TYPES)[number];

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;

  @IsOptional()
  @IsString()
  article?: string;

  @IsOptional()
  @IsString()
  videoUrl?: string;

  @IsOptional()
  @IsString()
  documentUrl?: string;
}
