import { PartialType } from '@nestjs/mapped-types';
import { PasswordDto } from './passReset.dto';

export class ForgotPasswordDto extends PartialType(PasswordDto) {

    
}
