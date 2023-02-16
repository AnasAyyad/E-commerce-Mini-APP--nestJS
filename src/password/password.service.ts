import { MailerService } from '@nestjs-modules/mailer/dist';
import { BadRequestException, Injectable, UnauthorizedException,NotFoundException } from '@nestjs/common';
import * as moment from 'moment';
import { UsersService } from 'src/users/users.service';
import { comparePassword, hashPassword } from 'src/utils/bycrypt';
import { ForgotPasswordDto } from './dto/passForgot.dto';
import { PasswordDto } from './dto/passReset.dto';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class PasswordService {
constructor(private userService: UsersService,
    private jwtService:JwtService,
    private mailerService:MailerService){}
    

   async updatePassword(id:number, passwordDto:PasswordDto) {
        const user = await this.userService.findOne(id);
        const matching= await  comparePassword(passwordDto.oldPassword,user.password);
        if(!matching) throw new UnauthorizedException("The password you entered was not correct");
        if(passwordDto.newPassword!==passwordDto.passConfirmation) throw new BadRequestException("Password doesnt match");
         const password = await hashPassword(passwordDto.newPassword)
         await this.userService.update(user.id,{password})
         
         return "password changed successfully"
    }



   private async createToken(id:number){
    const resetToken =crypto.randomBytes(32).toString('hex')
    const token = crypto.createHash('sha256').update(resetToken).digest('hex')
    const tokenDate = new Date()
   await  this.userService.update(id,{token,tokenDate})
    return resetToken
}



    async forgotPassword(email:string){

        const user = await this.userService.findUserByEmail(email)
        console.log(user);
        
        if(!user) throw new NotFoundException("Email is not correct")
        const token=await this.createToken(user.id)
        const url = `localhost:3000/password/reset/${token}`
        await this.mailerService.sendMail({
            to:email,
            subject: 'Password reset',
            html:`click <a href = ${url}>here</a> to reset your password`
        })

        return " Instructions to reset your password was sent to your email adress "
    }

    async resetPassword(resetToken:string,forgotPasswordDto:ForgotPasswordDto){
        const token = crypto.createHash("sha256").update(resetToken).digest('hex')
        console.log(token);
        
        const user = await this.userService.findUserJwt(token)
        if(!user){

            throw new UnauthorizedException("You are not authorized to proceed")
        }
        if(moment(user.tokenDate).add(10,"m") < moment())
        {
            await this.userService.update(user.id,{token:null,tokenDate:null});

             throw new BadRequestException("This link is expired. Please try again")
    }

         if(forgotPasswordDto.newPassword!==forgotPasswordDto.passConfirmation) throw new BadRequestException("Password doesnt match");
         const password = await hashPassword(forgotPasswordDto.newPassword)
         await this.userService.update(user.id,{password,token:null,tokenDate:null})
        
         return this.jwtService.sign({id:user.id,role:user.role})
    }
}
