import { Injectable ,UnauthorizedException} from "@nestjs/common";
import {  PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()

export class jwtStrategy extends PassportStrategy (Strategy){
constructor(){
    super({
        jwtFromRequest:ExtractJwt.fromExtractors([(request:Request)=>{
        let data = request?.cookies["Authorization"];
        if(!data) 
       { return null}
        
       return data
    }]),
        ignoreExpiration:false,
        secretOrKey:process.env.JWT_SECRET

    });
}


async validate (payload:any){
    if (payload === null) {
        throw new UnauthorizedException()
    }
     return {
        id:payload.id,
        role:payload.role
     }
}

}