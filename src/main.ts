import { NestFactory } from '@nestjs/core';
import { HttpExceptionFilter } from './http-exception.filter';
import { logger } from './logger.middleware';
import { AppModule } from './apps/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api/');
  app.useGlobalPipes(new ValidationPipe());

  app.enableShutdownHooks();
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.use(logger);
  app.useGlobalFilters(new HttpExceptionFilter());

  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API docs')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}
bootstrap();
