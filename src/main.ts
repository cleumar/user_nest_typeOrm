import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { LogInterceptor } from './interceptors/log.interceptor'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = new DocumentBuilder()
    .setTitle('User')
    .setDescription('User registration API description')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  app.enableCors()
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new LogInterceptor())
  await app.listen(3000)
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap()
