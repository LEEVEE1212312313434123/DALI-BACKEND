import { ApiProperty } from '@nestjs/swagger';

export class HealthResponseDto {
    @ApiProperty({ example: 'OK' })
    status: string;

    @ApiProperty({ example: '1.0.3' })
    version: string;

    @ApiProperty({ example: '1.0.1' })
    minVersion: string;

    @ApiProperty({ example: false })
    maintenance: boolean;

    @ApiProperty({ example: null, nullable: true })
    message: string | null;

    @ApiProperty({
        example: { database: { status: 'up' } },
        description: 'Detalles técnicos de la infraestructura'
    })
    infrastructure: any;
}