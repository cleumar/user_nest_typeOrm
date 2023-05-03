import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "src/user/user.service";
import { AuthRegisterDto } from "./dto/auth-register-dto";
import * as bcrypt from 'bcrypt'
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private prisma: PrismaService,
        private userService: UserService,
        private mailer: MailerService
        ) {}

    createToken(user: User){
        return {
            acessToken : this.jwtService.sign({
            id: user.id,
            name: user.name,
            email: user.email
        }, {
            expiresIn: "7 days",
            subject: String(user.id),
            issuer: "login",
            audience: "users"
        })
    }
    }

     checkToken(token: string){
        try {
            const data = this.jwtService.verify(token,  {
                audience: 'users',
                issuer: 'login'
            })

            return data

        } catch(e) {
            throw new BadRequestException(e)
        }
        }

    async login(email: string, password: string){
        const user = await this.prisma.user.findFirst({
            where: {
                email
            }
        })
        if (!user) {
            throw new UnauthorizedException('E-mail e/ou senha incorretos.');
          }
      
          if (!(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('E-mail e/ou senha incorretos.');
          }
      
          return this.createToken(user);
        }


    async forget(email: string){

        const user = await this.prisma.user.findFirst({
            where: {
                email,
                            }
        })
        if(!user) {
            throw new UnauthorizedException(`E-mail esta incorreto`)
        }

        const token = this.jwtService.sign(
            {
              id: user.id,
            },
            {
              expiresIn: '30 minutes',
              subject: String(user.id),
              issuer: 'forget',
              audience: 'users',
            },
          );

        await this.mailer.sendMail({
            subject: 'Recuperação de Senha',
            to: 'cleumar.mendes@gmail.com',
            template: 'forget',
            context: {
              name: user.name,
              token,
            },
          });
        return true
        
    }

    async reset(password: string, token: string) {
        try {
          const data: any = this.jwtService.verify(token, {
            issuer: 'forget',
            audience: 'users',
          });
    
          if (isNaN(Number(data.id))) {
            throw new BadRequestException('Token é inválido.');
          }
    
          const salt = await bcrypt.genSalt();
          password = await bcrypt.hash(password, salt);
    
          await this.prisma.user.update({
            where: {
                id: Number(data.id)
            },
            data: {
                password
            },
          });
    
          const user = await this.userService.show(Number(data.id));
    
          return this.createToken(user);
          
        } catch (e) {
          throw new BadRequestException(e);
        }
      }
    async register(data: AuthRegisterDto){
       const user =  await this.userService.create(data)

    }


     isValidToken(token: string){
        try {
            this.checkToken(token)
            return true

        } catch(e) {
            return false

        }
 
     }
}