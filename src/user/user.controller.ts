import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Patch,
  Delete,
  UseInterceptors,
  UseGuards
} from '@nestjs/common'

import { Roles } from '../decorators/roles.decorator'
import { LogInterceptor } from '../interceptors/log.interceptor'
import { UserService } from './user.service'
import { Role } from '../enums/roles.enum'
import { AuthGuard } from '../guards/auth.guards'
import { RoleGuard } from '../guards/role.guards'
import { CreateUserDTO } from './dto/create-user-dto'
import { ParamId } from '../decorators/param.id.decorator'
import { UpdatePutUserDTO } from './dto/update-put-user-dto'
import { UpdatePatchUserDTO } from './dto/update-patch-user-dto'
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags
} from '@nestjs/swagger'

@ApiTags('Users')
@Roles(Role.Admin)
@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiCreatedResponse({ description: 'successfully created.' })
  @ApiBadRequestResponse({ description: 'incorrect request syntax.' })
  @ApiConflictResponse({ description: 'A record with this email already exists.' })
  @ApiForbiddenResponse({ description: 'Forbidden resource' })
  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.userService.create(data)
  }

  @ApiOkResponse({ description: 'The found record' })
  @ApiBadRequestResponse({ description: 'incorrect request syntax' })
  @ApiNotFoundResponse({ description: 'Client not found' })
  @ApiForbiddenResponse({ description: 'Forbidden resource' })
  @Get()
  async list() {
    return this.userService.list()
  }

  @ApiOkResponse({ description: 'The found record' })
  @ApiBadRequestResponse({ description: 'incorrect request syntax' })
  @ApiNotFoundResponse({ description: 'Client not found' })
  @ApiForbiddenResponse({ description: 'Forbidden resource' })
  @Get(':id')
  async show(@ParamId() id: number) {
    console.log({ id })
    return this.userService.show(id)
  }

  @ApiOkResponse({ description: 'The found record' })
  @ApiBadRequestResponse({ description: 'incorrect request syntax' })
  @ApiNotFoundResponse({ description: 'Client not found' })
  @ApiForbiddenResponse({ description: 'Forbidden resource' })
  @Put(':id')
  async update(@Body() data: UpdatePutUserDTO, @ParamId() id: number) {
    return this.userService.update(id, data)
  }

  @ApiOkResponse({ description: 'The found record' })
  @ApiBadRequestResponse({ description: 'incorrect request syntax' })
  @ApiNotFoundResponse({ description: 'Client not found' })
  @ApiForbiddenResponse({ description: 'Forbidden resource' })
  @Patch(':id')
  async updatePartial(@Body() data: UpdatePatchUserDTO, @ParamId() id: number) {
    return this.userService.updatePartial(id, data)
  }

  @ApiOkResponse({ description: 'The found record' })
  @ApiBadRequestResponse({ description: 'incorrect request syntax' })
  @ApiNotFoundResponse({ description: 'Client not found' })
  @ApiForbiddenResponse({ description: 'Forbidden resource' })
  @Delete(':id')
  async delete(@ParamId() id: number) {
    return {
      success: await this.userService.delete(id)
    }
  }
}
