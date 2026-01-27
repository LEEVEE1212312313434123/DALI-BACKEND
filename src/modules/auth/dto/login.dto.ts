// src/modules/auth/dto/login.dto.ts
import { IsEmail, IsNotEmpty, IsString, ValidateNested, IsObject, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class DeviceDto {
    @ApiProperty({ example: 'android' })
    @IsString() @IsNotEmpty()
    platform: string;

    @ApiProperty({ example: '14' })
    @IsString() @IsNotEmpty()
    osVersion: string;

    @ApiProperty({ example: '1.0.3' })
    @IsString() @IsNotEmpty()
    appVersion: string;
}

export class LoginDto {
    @ApiProperty({ example: 'usuario@correo.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: '********' })
    @IsString() @MinLength(6)
    password: string;

    @ApiProperty({ type: DeviceDto })
    @IsObject()
    @ValidateNested()
    @Type(() => DeviceDto)
    device: DeviceDto;
}