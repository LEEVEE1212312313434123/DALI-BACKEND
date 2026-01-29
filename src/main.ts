import 'dotenv/config'; // <-- AGREGA ESTA LÍNEA AL PRINCIPIO
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common'; // 1. Importar esto

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 2. Configuración de Validación Global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,            // Elimina campos que no estén en tu DTO
      forbidNonWhitelisted: true, // Lanza error si envían campos de más
      transform: true,            // Convierte tipos automáticamente (ej: string a number)
    }),
  );

  // 3. Habilitar CORS (Crucial para apps móviles y web externas)
  app.enableCors();

  // Swagger Config
  const config = new DocumentBuilder()
    .setTitle('E-commerce API')
    .setDescription('Auth & Business Management API')
    .setVersion('1.0')
    .addBearerAuth() // 4. Útil para probar el login en Swagger después
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`🚀 Server running on http://localhost:${port}`);
  console.log(`📚 Swagger running on http://localhost:${port}/api`);
}

bootstrap();