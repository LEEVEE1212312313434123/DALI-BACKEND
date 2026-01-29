// src/modules/auth/auth.controller.ts
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto'; // Importa el DTO real
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { RegisterDto, RegisterSellerDto } from './dto/register.dto';

import { Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class JwtAuthGuard extends AuthGuard('jwt') { }

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    @ApiOperation({ summary: 'Registrar un Cliente normal' })
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto, 'CLIENT');
    }

    @Post('registerseller')
    @ApiOperation({ summary: 'Registrar un Vendedor con Negocio' })
    registerSeller(@Body() registerDto: RegisterSellerDto) {
        return this.authService.register(registerDto, 'SELLER');
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Inicio de sesión' })
    @ApiResponse({ status: 200, description: 'Login exitoso' })
    login(@Body() loginDto: LoginDto) { // Usa el DTO aquí
        return this.authService.login(loginDto);
    }

    @ApiBearerAuth() // <--- AGREGA ESTO AQUÍ
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    @ApiOperation({ summary: 'Obtener perfil del usuario autenticado' })
    @ApiResponse({ status: 200, description: 'Retorna los datos del token' })
    getProfile(@Req() req) {
        return req.user;
    }

}