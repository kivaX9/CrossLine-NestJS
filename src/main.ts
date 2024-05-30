import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';

import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Безопасные запросы к ресурсам на других доменах
  app.enableCors();

  await app.listen(8080);

  // Защита от подделок межсайтовых запросов
  app.use(csurf());
}
bootstrap();
