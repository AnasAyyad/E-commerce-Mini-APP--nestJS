import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { comparePassword } from 'src/utils/bycrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private  userService: UsersService,
        private jwtService:JwtService){}



    async validateUser(email: string,password:string){
        const userDB = await this.userService.findUserByEmail(email)
        
        if(userDB){
            const matching= await comparePassword(password,userDB.password)
            if(matching){
                const {password,...user}=userDB
                return user;}
        }
        
        return null;
    }



    async login(user:User){

        const payload= {id:user.id,role:user.role}
        return this.jwtService.signAsync(payload)
    }
    }
