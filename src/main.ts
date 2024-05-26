import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';

import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  // Защита от подделок межсайтовых запросов
  app.use(csurf());
}
bootstrap();
