import {
  Controller,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  BadRequestException,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
  UploadedFile,
  UploadedFiles
} from '@nestjs/common'

import { FileInterceptor, FilesInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express'
import { AuthService } from './auth.service'

import { AuthRegisterDTO } from './dto/auth-register.dto'

import { FileService } from '../file/file.service'

import { User } from '../decorators/user.decorator'
import { UserEntity } from '../user/entity/user.entity'
import { AuthLoginDTO } from './dto/auth-login-dto'
import { AuthForgetDTO } from './dto/auth-forget-dto'
import { AuthResetDTO } from './dto/auth-reset-dto'
import { AuthGuard } from '../guards/auth.guards'
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiTags
} from '@nestjs/swagger'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly fileService: FileService
  ) {}

  @ApiCreatedResponse({ description: 'successfully created.' })
  @ApiBadRequestResponse({ description: 'incorrect request syntax.' })
  @ApiConflictResponse({ description: 'A record with this email already exists.' })
  @ApiForbiddenResponse({ description: 'Forbidden resource' })
  @Post('login')
  async login(@Body() { email, password }: AuthLoginDTO) {
    return this.authService.login(email, password)
  }

  @ApiCreatedResponse({ description: 'successfully created.' })
  @ApiBadRequestResponse({ description: 'incorrect request syntax.' })
  @ApiConflictResponse({ description: 'A record with this email already exists.' })
  @ApiForbiddenResponse({ description: 'Forbidden resource' })
  @Post('register')
  async register(@Body() body: AuthRegisterDTO) {
    return this.authService.register(body)
  }

  @ApiCreatedResponse({ description: 'successfully created.' })
  @ApiBadRequestResponse({ description: 'incorrect request syntax.' })
  @ApiConflictResponse({ description: 'A record with this email already exists.' })
  @ApiForbiddenResponse({ description: 'Forbidden resource' })
  @Post('forget')
  async forget(@Body() { email }: AuthForgetDTO) {
    return this.authService.forget(email)
  }

  @ApiCreatedResponse({ description: 'successfully created.' })
  @ApiBadRequestResponse({ description: 'incorrect request syntax.' })
  @ApiConflictResponse({ description: 'A record with this email already exists.' })
  @ApiForbiddenResponse({ description: 'Forbidden resource' })
  @Post('reset')
  async reset(@Body() { password, token }: AuthResetDTO) {
    return this.authService.reset(password, token)
  }

  @UseGuards(AuthGuard)
  @ApiCreatedResponse({ description: 'successfully created.' })
  @ApiBadRequestResponse({ description: 'incorrect request syntax.' })
  @ApiConflictResponse({ description: 'A record with this email already exists.' })
  @ApiForbiddenResponse({ description: 'Forbidden resource' })
  @Post('me')
  async me(@User() user: UserEntity) {
    return user
  }

  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({ description: 'successfully created.' })
  @ApiBadRequestResponse({ description: 'incorrect request syntax.' })
  @ApiConflictResponse({ description: 'A record with this email already exists.' })
  @ApiForbiddenResponse({ description: 'Forbidden resource' })
  @Post('photo')
  async uploadPhoto(
    @User() user: UserEntity,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'image/png' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 50 })
        ]
      })
    )
    photo: Express.Multer.File
  ) {
    const filename = `photo-${user.id}.png`

    try {
      await this.fileService.upload(photo, filename)
    } catch (e) {
      throw new BadRequestException(e)
    }

    return photo
  }

  @UseInterceptors(FilesInterceptor('files'))
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({ description: 'successfully created.' })
  @ApiBadRequestResponse({ description: 'incorrect request syntax.' })
  @ApiConflictResponse({ description: 'A record with this email already exists.' })
  @ApiForbiddenResponse({ description: 'Forbidden resource' })
  @Post('files')
  async uploadFiles(@User() user, @UploadedFiles() files: Express.Multer.File[]) {
    return files
  }

  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'photo',
        maxCount: 1
      },
      {
        name: 'documents',
        maxCount: 10
      }
    ])
  )
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({ description: 'successfully created.' })
  @ApiBadRequestResponse({ description: 'incorrect request syntax.' })
  @ApiConflictResponse({ description: 'A record with this email already exists.' })
  @ApiForbiddenResponse({ description: 'Forbidden resource' })
  @Post('files-fields')
  async uploadFilesFields(
    @User() user,
    @UploadedFiles()
    files: { photo: Express.Multer.File; documents: Express.Multer.File[] }
  ) {
    return files
  }
}
