import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Habilita CORS para o frontend

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Habilita transformação automática
    }),
  );

  await app.listen(3000);
}
bootstrap();
