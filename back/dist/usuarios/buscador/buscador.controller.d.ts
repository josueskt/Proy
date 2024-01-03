import { BuscadorService } from './buscador.service';
export declare class BuscadorController {
    private buscar;
    constructor(buscar: BuscadorService);
    buscador_libro(cadena: string, carrera: string): Promise<any>;
}
