import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';
import { CheckEmailDto } from './dto/check-email.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Email')
@Controller('email')
export class EmailController {
    constructor(private readonly emailService: EmailService) { }

    @Post('check')
    @ApiOperation({ summary: 'Verificar si un email es válido y existe' })
    async check(@Body() dto: CheckEmailDto) {
        return this.emailService.checkEmail(dto.email);
    }
}
