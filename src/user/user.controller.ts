import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";

@Controller('users')

export class UserController {
    @Post()
    async create (@Body() body){
        return {body}
    }

    @Get()
    async list (){
        return {users: []}
    }

    @Get(':id')
    async show (@Param() param){
        return {users : {}, param}
    }

    @Put(':id')
    async update (@Body() body, @Param() param){
        return {body, param}
    }

    @Patch(':id')
    async updatePartial (@Body() body, @Param() param){
        return {body, param}
    }

    @Delete(':id')
    async delete ( @Param() param){
        return { param}
    }

}

