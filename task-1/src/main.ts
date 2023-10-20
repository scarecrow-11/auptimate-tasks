import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'

const PORT = process.env.PORT || 4000

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe({ transform: true })) // Enables DTO transform globally
  await app.listen(PORT)
}

bootstrap()
