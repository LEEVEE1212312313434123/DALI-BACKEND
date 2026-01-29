import { ApiProperty } from '@nestjs/swagger';

export class CheckEmailDto {
    @ApiProperty({ 
        example: 'usuario@ejemplo.com', 
        description: 'Correo electrónico a verificar' 
    })
    email: string;
}
