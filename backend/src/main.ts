import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('./secrets/create-cert-key.pem'),
    cert: fs.readFileSync('./secrets/create-cert.pem'),
  };

  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });

  app.enableCors({
    origin: 'https://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATH'],
  });

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const uploadsDir = path.join(__dirname, 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
  }

  const config = new DocumentBuilder()
    .setTitle('SGP Documentación')
    .setDescription(
      'Documentación para el proyecto de sistema gestión de proyectos',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use('/uploads', express.static('uploads'));
  await app.listen(process.env.PORT);
  const logger = new Logger('bootstrap');
  logger.log(`App running on port ${process.env.PORT}`);
}

bootstrap();
