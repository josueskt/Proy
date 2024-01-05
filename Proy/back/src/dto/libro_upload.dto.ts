import { IsNotEmpty } from "class-validator"

export class Libro_Upload{
@IsNotEmpty()
titulo  : String
//asdsads
@IsNotEmpty()
imagen:String
@IsNotEmpty()
descripcion : String
@IsNotEmpty()
num_paginas :String
@IsNotEmpty()
fk_creador :String
@IsNotEmpty()
fk_autor:Number
@IsNotEmpty()
fk_carrera: Number
}