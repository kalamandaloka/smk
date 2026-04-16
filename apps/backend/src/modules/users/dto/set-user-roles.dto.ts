import { IsArray, IsString } from 'class-validator';

export class SetUserRolesDto {
  @IsArray()
  @IsString({ each: true })
  roleCodes: string[];
}
