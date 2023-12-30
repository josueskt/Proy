import { LibroService } from './libro.service';
export declare class LibroController {
    carrera: LibroService;
    constructor(carrera: LibroService);
    Traer_todos(datos: any): Promise<any>;
    by_id(id: Number): Promise<any>;
    crear(file: any, libro: any): Promise<{
        message: string;
        newFileName: string;
    }>;
    eliminar(id: string): Promise<any>;
    editar(id: Number, datos: any): Promise<any>;
}
