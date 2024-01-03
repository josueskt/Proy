import { IsNotEmpty, IsNumber, IsString, Length, MaxLength, MinLength } from "class-validator";

export class RegisterUser {
    @IsNotEmpty()
    @Length(1, 10, { message: 'La longitud del código debe estar entre 1 y 10 caracteres.' })
    @IsString()
    readonly id_user: string; // Cambiado a 'string' en lugar de 'String'
    @IsNotEmpty()
    @IsString()
    readonly email: string; // Cambiado a 'string' en lugar de 'String'
    @IsNotEmpty()
    @IsString()
    readonly password: string; // Cambiado a 'string' en lugar de 'String'
    @IsNotEmpty()
    @IsString()
    readonly nombre: string; // Cambiado a 'string' en lugar de 'String'
    @IsNotEmpty()
    @IsNumber()
    readonly fk_rol: number; // Cambiado a 'number' en lugar de 'Number'
}
