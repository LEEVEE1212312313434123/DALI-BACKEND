import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsEnum, IsInt, IsArray, IsOptional, ValidateNested, MinLength, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { BusinessType } from '@prisma/client';

// 1. Objeto del Negocio (Solo para Vendedores)
export class BusinessDto {
    @ApiProperty({ example: 'Droguería Lupe' })
    @IsString() @IsNotEmpty()
    name: string;

    @ApiProperty({
        enum: BusinessType,
        example: BusinessType.FERRETERIA
    })
    @IsEnum(BusinessType)
    business_type: BusinessType;

    @ApiProperty({ example: 5 })
    @IsInt()
    years_active: number;
}

// 2. DTO Base (Datos comunes para todos los usuarios)
export class RegisterDto {
    @ApiProperty({ example: 'usuario@correo.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'password123', minLength: 6 })
    @IsString() @MinLength(6)
    password: string;

    @ApiProperty({ example: 'Juan' })
    @IsString() @IsNotEmpty()
    first_name: string;

    @ApiProperty({ example: 'Pérez' })
    @IsString() @IsNotEmpty()
    last_name: string;

    @ApiProperty({ example: '+51987654321' })
    @IsString() @IsNotEmpty()
    phone_number: string;

    @ApiProperty({
        example: ['TERMS_v1', 'PRIVACY_v1'],
        description: 'Documentos legales aceptados'
    })
    @IsArray()
    accepted_documents: string[];

    // Propiedad interna para el servicio
    mode?: 'CLIENT' | 'SELLER';
}

// 3. DTO Especializado para Vendedores
export class RegisterSellerDto extends RegisterDto {
    @ApiProperty({ type: BusinessDto })
    @ValidateNested()
    @Type(() => BusinessDto)
    business: BusinessDto; // Aquí es obligatorio
}