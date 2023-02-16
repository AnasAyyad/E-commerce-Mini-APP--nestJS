import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class PasswordDto{
    @IsNotEmpty()
    oldPassword:string;

    @IsNotEmpty()
    @MaxLength(20)
    @MinLength(8)
    newPassword:string;

    @IsNotEmpty()
    passConfirmation:string;
}