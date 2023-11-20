import { IsNumber, IsString, Length, MaxLength, MinLength } from "class-validator"

export class RegisterUser {
    @Length(1, 10, { message: 'La longitud del código debe estar entre 1 y 10 caracteres.' })
    @IsString()
    readonly id_user: String;
    @IsString()
    readonly email: String;
    @IsString()
    readonly password: String;
    @IsString()
    readonly nombre: String;
    @IsNumber()
    readonly fk_rol: Number;


}