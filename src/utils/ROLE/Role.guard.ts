import { CanActivate, Injectable ,ExecutionContext} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "../role.enum";


@Injectable()
export class RoleGaurd implements CanActivate{
 constructor(private reflector:Reflector){}
 

 async canActivate ( context : ExecutionContext){
console.log("inside role");
    const requiredRole= this.reflector.getAllAndOverride<Role>("role",[context.getHandler(),context.getClass()])
    const {user}=context.switchToHttp().getRequest()
    console.log(requiredRole);
    if(!requiredRole) return true;

    return user.role===requiredRole
 }
}