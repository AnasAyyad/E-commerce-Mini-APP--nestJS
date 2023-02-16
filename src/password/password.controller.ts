import { Body,Response, Controller, Post, Param,Request, ValidationPipe } from '@nestjs/common';
import { Public } from 'src/auth/utils/puplic decorator/puplic.decorator';
import { ForgotPasswordDto } from './dto/passForgot.dto';
import { PasswordDto } from './dto/passReset.dto';
import { PasswordService } from './password.service';

@Controller('password')
export class PasswordController {

constructor(private passwordService: PasswordService){}


    @Post('update')
    updatePassword(@Request() req,@Body(ValidationPipe) passwordDto:PasswordDto){
        return this.passwordService.updatePassword(req.user.id,passwordDto)
    }

    @Public()
    @Post('forgot')
    async forgotPassword(@Body('email') email:string){
        console.log(email
            );
        
        return this.passwordService.forgotPassword(email)
    }

    @Public()
    @Post('reset/:token')
    async resetPassword(@Param("token") token :string,
    @Body(ValidationPipe) forgotPasswordDto:ForgotPasswordDto,
    @Response({passthrough:true}) res ) {
        const tokken = await this.passwordService.resetPassword(token, forgotPasswordDto)
        res.cookie("Authorization",tokken,{httpOnly:true})
        return " password changed successfully"
    }
}
