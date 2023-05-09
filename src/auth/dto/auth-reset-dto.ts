import { IsJWT, IsString, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class AuthResetDTO {
  @ApiProperty({ description: 'password user' })
  @IsString()
  @MinLength(6)
  password: string

  @ApiProperty({ description: 'token user' })
  @IsJWT()
  token: string
}
