export interface Usuario{
id_user: string;
email:string;
password:string;
nombre:string;
fk_rol:number;
activo:boolean;
cambio:boolean;
carrera:string
}