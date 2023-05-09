import { IsString, IsEmail, MinLength, IsOptional, IsDateString, IsEnum } from 'class-validator'
import { Role } from '../../enums/roles.enum'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDTO {
  @ApiProperty({ description: 'name user' })
  @IsString()
  name: string

  @ApiProperty({ description: 'email user' })
  @IsEmail()
  email: string

  @ApiProperty({ description: 'password user' })
  @IsString()
  @MinLength(6)
  password: string

  @ApiProperty({ description: 'birthAt user' })
  @IsOptional()
  @IsDateString()
  birthAt?: string

  @ApiProperty({ description: 'role user', example: Role })
  @IsOptional()
  @IsEnum(Role)
  role?: number
}
