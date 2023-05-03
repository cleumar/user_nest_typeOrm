import { Body, Controller, Delete, Get, Patch, Post, Put, UseGuards, UseInterceptors } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user-dto";
import { UpdatePutUserDTO } from "./dto/update-put-user-dto";
import { UserService } from "./user.service";
import { UpdatePatchUserDTO } from "./dto/update-patch-user-dto";
import { ParamId } from "src/decorators/param.id.decorator";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/enums/roles.enum";
import { RoleGuard } from "src/guards/role.guards";
import { AuthGuard } from "src/guards/auth.guards";

//import { LogInterceptor } from "src/interceptors/log.interceptor";

//@UseInterceptors(LogInterceptor)
@UseGuards( AuthGuard, RoleGuard)
@Controller('users')

export class UserController {
constructor(private userService: UserService){}

    @Roles(Role.Admin)
    @Post()
    async create (@Body() data: CreateUserDTO){
        return await this.userService.create(data)
    }

    @Roles(Role.Admin)
    @Get()
    async list (){
        return await this.userService.list()
    }

    @Roles(Role.Admin, Role.User)
    @Get(':id')
    async show (@ParamId() id: number){
        return await this.userService.show(id)
    }

    @Roles(Role.Admin)
    @Put(':id')
    async update (@Body() data: UpdatePutUserDTO, @ParamId()  id:number){
        return await this.userService.update(id,data)
    }

    @Roles(Role.Admin)
    @Patch(':id')
    async updatePartial (@Body() data: UpdatePatchUserDTO, @ParamId() id: number){
        return await this.userService.updatePartial(id,data)
    }

    @Roles(Role.Admin)
    @Delete(':id')
    async delete ( @ParamId() id: number){
        return await this.userService.delete(id)
    }

}

