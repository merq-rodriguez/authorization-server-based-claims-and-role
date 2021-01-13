import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const port = configService.get('http.port');
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('v1');
  await app.listen(port);
}
bootstrap();
