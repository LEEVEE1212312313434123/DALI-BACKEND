import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class EmailService {
    constructor(private prisma: PrismaService) { }

    async checkEmail(email: string) {
        const exists = await this.prisma.user.findUnique({
            where: { email },
            select: { id: true },
        });

        return {
            email,
            exists: !!exists,
        };
    }
}
