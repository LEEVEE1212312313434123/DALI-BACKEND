import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { EmailService } from './email.service';
import { CheckEmailDto } from './dto/check-email.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ZodValidationPipe } from '@/common/pipes/zod-validation.pipe';
import { checkEmailSchema } from './schemas/email.schema';

@ApiTags('Email')
@Controller('email')
export class EmailController {
    constructor(private readonly emailService: EmailService) { }

    @Post('check')
    @ApiOperation({ summary: 'Verificar si un email es válido y existe' })
    @ApiResponse({ status: 200, description: 'Verificación exitosa' })
    @ApiResponse({ status: 400, description: 'Email inválido (Validado por Zod)' })

    // Aquí aplicamos la lógica de Zod
    @UsePipes(new ZodValidationPipe(checkEmailSchema)) 
    async check(@Body() dto: CheckEmailDto) {
        // 'dto' ya viene validado y transformado (lowercase) por Zod
        return this.emailService.checkEmail(dto.email);
    }
}
