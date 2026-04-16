declare const LESSON_TYPES: readonly ["ARTICLE", "VIDEO", "DOCUMENT", "QUIZ", "INTERACTIVE_3D", "AR_ACTIVITY", "VR_ACTIVITY", "MR_ACTIVITY"];
export declare class CreateLessonDto {
    moduleId: string;
    title: string;
    type: (typeof LESSON_TYPES)[number];
    order?: number;
    article?: string;
    videoUrl?: string;
    documentUrl?: string;
}
export {};
