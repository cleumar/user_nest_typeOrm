import { IsEmail } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class AuthForgetDTO {
  @ApiProperty({ description: 'email user' })
  @IsEmail()
  email: string
}
