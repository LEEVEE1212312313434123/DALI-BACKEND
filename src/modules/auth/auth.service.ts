import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { LoginDto } from '@/modules/auth/dto/login.dto'; // Similar al anterior pero para login
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto, RegisterSellerDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async register(data: RegisterDto | RegisterSellerDto) {
        const { email, password, ...userData } = data;

        // Extraemos 'business' validando si existe en el objeto 'data'
        const business = 'business' in data ? data.business : null;

        // Verificar si el usuario ya existe
        const existingUser = await this.prisma.user.findUnique({ where: { email } });
        if (existingUser) throw new ConflictException('Email already registered');

        const hashedPassword = await bcrypt.hash(password, 10);

        return this.prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    firstName: userData.first_name,
                    lastName: userData.last_name,
                    phoneNumber: userData.phone_number,
                    role: data.mode || 'CLIENT',
                    acceptedDocuments: data.accepted_documents,
                },
            });

            // Usamos la variable 'business' que extrajimos arriba
            if (data.mode === 'SELLER' && business) {
                await tx.business.create({
                    data: {
                        name: business.name,
                        businessType: business.business_type,
                        yearsActive: business.years_active,
                        userId: user.id,
                    },
                });
            }

            return this.generateTokens(user);
        });
    }

    async login(data: any) {
        const user = await this.prisma.user.findUnique({
            where: { email: data.email },
            include: { business: true }
        });

        if (!user || !(await bcrypt.compare(data.password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Registrar la sesión (dispositivo)
        await this.prisma.session.create({
            data: {
                userId: user.id,
                platform: data.device.platform,
                osVersion: data.device.osVersion,
                appVersion: data.device.appVersion,
                refreshToken: 'temp_refresh_token_' + Date.now(), // Aquí generarías un UUID real
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 días
            }
        });

        return this.generateTokens(user);
    }

    private async generateTokens(user: any) {
        const payload = { sub: user.id, email: user.email, role: user.role };
        return {
            accessToken: await this.jwtService.signAsync(payload),
            refreshToken: 'refresh_token_example', // Implementar lógica de refresh real
            tokenType: 'Bearer',
            expiresIn: 3600,
            user: {
                id: user.id,
                email: user.email,
                name: `${user.firstName} ${user.lastName}`,
                role: user.role,
                onboardingCompleted: user.onboardingCompleted,
            },
        };
    }
}