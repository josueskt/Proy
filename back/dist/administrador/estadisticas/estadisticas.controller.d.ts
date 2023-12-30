import { EstadisticasService } from './estadisticas.service';
export declare class EstadisticasController {
    estadostica: EstadisticasService;
    constructor(estadostica: EstadisticasService);
    registro_iniciado(): Promise<any>;
}
