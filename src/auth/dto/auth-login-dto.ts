import { IsEmail, IsString, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class AuthLoginDTO {
  @ApiProperty({ description: 'email user' })
  @IsEmail()
  email: string

  @ApiProperty({ description: 'password user' })
  @IsString()
  @MinLength(6)
  password: string
}
