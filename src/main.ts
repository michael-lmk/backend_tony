import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for the frontend URL
  app.enableCors({
    origin: 'http://localhost:3001',
  });

  // Listen on the correct port
  await app.listen(3200);
}
bootstrap();
