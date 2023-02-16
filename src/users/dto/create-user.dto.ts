import { IsEmail,IsEnum,IsNotEmpty } from "class-validator";
import { Role } from "src/utils/role.enum";
import { MaxLength, MinLength } from "class-validator";


export class CreateUserDto {
@IsEmail()
@IsNotEmpty()
email:string;

@IsNotEmpty()
@MaxLength(20)
@MinLength(8)
password:string;

@IsNotEmpty()
firstName:string;

@IsNotEmpty()
lastName:string;

@IsNotEmpty()
dateOfBirth:Date;

@IsNotEmpty()
@IsEnum(Role)
role:Role


}
