import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseInterceptors } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user-dto";
import { UpdatePutUserDto } from "./dto/update-put-user-dto";
import { UserService } from "./user.service";
import { UpdatePatchUserDto } from "./dto/update-patch-user-dto";
import { ParamId } from "src/decorators/param.id.decorator";
//import { LogInterceptor } from "src/interceptors/log.interceptor";

//@UseInterceptors(LogInterceptor)
@Controller('users')

export class UserController {
constructor(private userService: UserService){}

    @Post()
    async create (@Body() data: CreateUserDto){
        return await this.userService.create(data)
    }

    @Get()
    async list (){
        return await this.userService.list()
    }

    @Get(':id')
    async show (@ParamId() id: number){
        return await this.userService.show(id)
    }

    @Put(':id')
    async update (@Body() data: UpdatePutUserDto, @ParamId()  id:number){
        return await this.userService.update(id,data)
    }

    @Patch(':id')
    async updatePartial (@Body() data: UpdatePatchUserDto, @ParamId() id: number){
        return await this.userService.updatePartial(id,data)
    }

    @Delete(':id')
    async delete ( @ParamId() id: number){
        return await this.userService.delete(id)
    }

}

