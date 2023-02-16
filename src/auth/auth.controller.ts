import { AuthService } from './auth.service';
import { Controller,Post, Request, UseGuards,Response } from '@nestjs/common';
import { localAuth } from './utils/guards/auth.guard';
import { Public } from './utils/puplic decorator/puplic.decorator';

@Controller("p")
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }


@Post('login')
@UseGuards(localAuth)
@Public()
 async  login(@Request() req,@Response({passthrough:true}) res){
  const tokken= await this.authService.login(req.user)
  
   res.cookie("Authorization",tokken,{httponly: true})
  return req.user
  }


}
