import { Response } from 'express';
export declare class MediaController {
    uploadFile(file: Express.Multer.File): {
        url: string;
        filename: string;
        mimetype: string;
        size: number;
    };
    getFile(filename: string, res: Response): void | Response<any, Record<string, any>>;
}
