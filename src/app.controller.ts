import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'

@Controller()
@ApiTags('Health-Check')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOkResponse({ description: 'Return Health-Check ' })
  @Get()
  getHello(): string {
    return this.appService.getHello()
  }
}
