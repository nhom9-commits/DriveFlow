import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Cho phép kết nối CORS từ Next.js frontend
  app.enableCors();

  const port = process.env.PORT || 5000;
  await app.listen(port);
  console.log(`NestJS server is running on http://localhost:${port}`);
}

bootstrap();
