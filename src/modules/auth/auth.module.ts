// src/modules/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '@/modules/auth/strategies/jwt.strategy';
import { EmailModule } from '@/modules/email/email.module';

@Module({
    imports: [EmailModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: {
                // Convertimos a número. 3600 segundos = 1 hora.
                expiresIn: Number(process.env.JWT_EXPIRES_IN_SECONDS) || 3600,
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
})
export class AuthModule { }