// src/modules/auth/auth.controller.ts
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto'; // Importa el DTO real
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RegisterDto, RegisterSellerDto } from './dto/register.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    @ApiOperation({ summary: 'Registrar un Cliente normal' })
    register(@Body() registerDto: RegisterDto) {
        registerDto.mode = 'CLIENT';
        return this.authService.register(registerDto);
    }

    @Post('registerseller')
    @ApiOperation({ summary: 'Registrar un Vendedor con Negocio' })
    registerSeller(@Body() registerDto: RegisterSellerDto) {
        registerDto.mode = 'SELLER';
        return this.authService.register(registerDto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Inicio de sesión' })
    @ApiResponse({ status: 200, description: 'Login exitoso' })
    login(@Body() loginDto: LoginDto) { // Usa el DTO aquí
        return this.authService.login(loginDto);
    }
}