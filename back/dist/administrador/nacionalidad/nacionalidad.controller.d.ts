import { NacionalidadService } from './nacionalidad.service';
export declare class NacionalidadController {
    private Nacionalidad;
    constructor(Nacionalidad: NacionalidadService);
    get_nacionalidad(): Promise<any>;
    eliminar(id: Number): Promise<any>;
    crear_nacionalidad(datos: any): void;
}
