// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Importa tus módulos creados (ajusta las rutas si es necesario)
import { AuthModule } from '@/modules/auth/auth.module';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule, // Carga la conexión a la base de datos
    AuthModule,   // Carga los controladores de auth/login y auth/register
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }