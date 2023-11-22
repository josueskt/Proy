import { IsNotEmpty } from "class-validator"

export class Libro_Upload{
@IsNotEmpty()
titulo  : String


imagen:String

descripcion : String

num_paginas :String

fk_creador :String

fk_autor:Number

fk_carrera: Number
}