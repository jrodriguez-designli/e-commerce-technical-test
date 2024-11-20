import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { RestJwtAuthGuard } from '@modules/auth/guards/rest-jwt-auth.guard'
import { RolesGuard } from '@modules/auth/guards/role.guard'
import { ValidationPipe } from '@nestjs/common'
const dotenv = require('dotenv')
dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const reflector = app.get(Reflector)

  app.setGlobalPrefix('api/v1')

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      disableErrorMessages: false,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  )

  const config = new DocumentBuilder()
    .setTitle('Bloodknot API')
    .setDescription('API using RESTFUL and JWT Authentication')
    .setVersion('1.0')
    .build()

  //app.useGlobalGuards(new RolesGuard(reflector))

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(process.env.PORT ?? 3002)
}

bootstrap()
