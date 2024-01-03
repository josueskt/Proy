import { LibroService } from '../libro.service';
export declare class MilibroController {
    private carrera;
    constructor(carrera: LibroService);
    Traer_todos(datos: any): Promise<any>;
}
