import { IsNotEmpty } from "class-validator"

export class Libro_Upload{
@IsNotEmpty()
titulo  : string
@IsNotEmpty()
imagen:string
@IsNotEmpty()
descripcion : string
@IsNotEmpty()
num_paginas :string
@IsNotEmpty()
fk_creador :string
@IsNotEmpty()
fk_autor:number
@IsNotEmpty()
fk_carrera: number
}