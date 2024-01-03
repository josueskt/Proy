import { CambioContraService } from './cambio_contra.service';
export declare class CambioContraController {
    private cambio;
    constructor(cambio: CambioContraService);
    buscador_libro(datos: any): Promise<any>;
}
