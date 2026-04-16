import { RolesService } from './roles.service';
export declare class RolesController {
    private readonly svc;
    constructor(svc: RolesService);
    listRoles(): Promise<{
        id: string;
        code: string;
        name: string;
        createdAt: Date;
    }[]>;
    listPermissions(): Promise<{
        id: string;
        code: string;
        name: string;
        createdAt: Date;
    }[]>;
}
