import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';

// const httpsOptions = {
//   key: fs.readFileSync('./secrets/cert.key'),
//   cert: fs.readFileSync('./secrets/cert.crt'),
// };

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // httpsOptions,
  });

  // Configuración de HTTPS
  app.enableCors({
    // origin: 'https://localhost:5173',
    // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // credentials: true,
  });

  // Otras configuraciones globales
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Configuración de directorio estático
  const uploadsDir = path.join(__dirname, 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
  }
  app.use('/uploads', express.static('uploads'));

  // Iniciar el servidor
  await app.listen(process.env.PORT);
  const logger = new Logger('bootstrap');
  logger.log(`App running on port ${process.env.PORT}`);
}

bootstrap();