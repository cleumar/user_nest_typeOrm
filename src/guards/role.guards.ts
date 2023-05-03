import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "../enums/roles.enum";
import { ROLES_KEY } from "../decorators/roles.decorator";



@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector   
        ) {}
    
    async canActivate(context: ExecutionContext) {
            const requeridRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()])

            if(!requeridRoles) {
                return true
            }
            const  {user } = context.switchToHttp().getRequest()

            const rolesFilted =requeridRoles.filter(role => role === user.role)

            return rolesFilted.length > 0


        }

        
    
}

