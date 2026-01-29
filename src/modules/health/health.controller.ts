// src/health/health.controller.ts
import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HealthCheck, PrismaHealthIndicator } from '@nestjs/terminus';
import { PrismaService } from '../../prisma/prisma.service';
import { ApiTags, ApiOperation, ApiResponse, ApiOkResponse } from '@nestjs/swagger';
import { HealthResponseDto } from './dto/health-response.dto';

@ApiTags('System')
@Controller('health')
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private prismaHealth: PrismaHealthIndicator,
        private prisma: PrismaService,
    ) { }

    @Get()
    @ApiOperation({ summary: 'Estado del sistema y control de versiones' })
    @ApiOkResponse({
        description: 'Respuesta personalizada de salud',
        type: HealthResponseDto
    })
    async check() {

        const result = await this.health.check([
            () => this.prismaHealth.pingCheck('database', this.prisma),
        ]);

        return {
            status: result.status.toUpperCase(), // "OK"
            version: process.env.APP_VERSION || '1.0.3',
            minVersion: process.env.APP_MIN_VERSION || '1.0.1',
            maintenance: process.env.APP_MAINTENANCE === 'true',
            message: null,
            infrastructure: result.details,
        };
    }
}