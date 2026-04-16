export declare class CreateQuizOptionDto {
    text: string;
    isCorrect?: boolean;
}
export declare class CreateQuizQuestionDto {
    prompt: string;
    order?: number;
    options: CreateQuizOptionDto[];
}
export declare class CreateQuizDto {
    lessonId: string;
    passingScore?: number;
    maxAttempts?: number;
    questions: CreateQuizQuestionDto[];
}
