import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as cookieParser from 'cookie-parser'



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser())
  console.log();
  
  await app.listen(3000);
  
}
bootstrap();