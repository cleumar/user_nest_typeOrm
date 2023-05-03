import { BadRequestException, Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";


import { AuthLoginDto } from "./dto/auth-login-dto";
import { AuthRegisterDto } from "./dto/auth-register-dto";
import { AuthForgetDto } from "./dto/auth-forget-dto";
import { AuthResetDto } from "./dto/auth-reset-dto";
import { AuthService } from "./auth.service";
import { UserService } from "src/user/user.service";
import { AuthGuard } from "src/guards/auth.guards";
import { User } from "src/decorators/user.decorator";
import { FileInterceptor } from "@nestjs/platform-express";
import { join } from 'path'
import { FileService } from "src/file/file.service";

@Controller('auth')

export class AuthController {
constructor(
    private userService: UserService,
    private authService: AuthService,
    private fileService: FileService
    ){}

    @Post('login')
    async login (@Body() {email, password}: AuthLoginDto){
        return await this.authService.login(email, password)
    }

    @Post('register')
    async register (@Body() body: AuthRegisterDto){
        return await this.authService.register(body)
    }


    @Post('forget')
    async forget (@Body() {email}: AuthForgetDto){
        return await this.authService.forget(email)
    }


    @Post()
    async reset (@Body() { password, token}: AuthResetDto){
        return await this.authService.reset(password, token)
    }

    @UseGuards(AuthGuard)
    @Post('me')
    async me (@User() user ){
        return {user}
    }

    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(AuthGuard)
    @Post('photo')
    async uploadPhoto (@User() user, @UploadedFile()  photo: Express.Multer.File) {

        const path = join(__dirname,'..', '..','storage', 'photos', `photo-${user.id}.jpeg`)
        try {
         await this.fileService.upload(photo, path)
        } catch(e){
            throw new BadRequestException(e)

        }
         return {sucess: true}
    }

    

}

