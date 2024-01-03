import { AutorService } from './autor.service';
export declare class AutorController {
    private Autro;
    constructor(Autro: AutorService);
    traer(): Promise<any>;
    crear(nombre: String, nacionalidad: Number): void;
    eliminar(id: number): void;
}
