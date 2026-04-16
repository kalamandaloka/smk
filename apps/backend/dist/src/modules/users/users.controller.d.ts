import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SetUserRolesDto } from './dto/set-user-roles.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    list(): Promise<{
        name: string;
        id: string;
        email: string;
        isActive: boolean;
        createdAt: Date;
        userRoles: {
            role: {
                name: string;
                code: string;
            };
        }[];
        school: {
            name: string;
            id: string;
        } | null;
    }[]>;
    get(id: string): Promise<{
        name: string;
        id: string;
        email: string;
        isActive: boolean;
        createdAt: Date;
        userRoles: {
            role: {
                name: string;
                id: string;
                code: string;
            };
        }[];
        school: {
            name: string;
            id: string;
        } | null;
        taughtClasses: {
            class: {
                name: string;
                id: string;
            };
        }[];
        studentClasses: {
            class: {
                name: string;
                id: string;
            };
        }[];
        homeroomForClasses: {
            name: string;
            id: string;
        }[];
    }>;
    create(dto: CreateUserDto): Promise<{
        id: string;
    }>;
    update(id: string, dto: UpdateUserDto): Promise<{
        id: string;
    }>;
    delete(id: string): Promise<{
        id: string;
    }>;
    setRoles(id: string, dto: SetUserRolesDto): Promise<{
        userId: string;
        roleCodes: string[];
    }>;
}
