import { CarreraService } from './carrera.service';
export declare class CarreraController {
    carrera: CarreraService;
    constructor(carrera: CarreraService);
    Traer_todos(): Promise<any>;
    by_id(id: Number): Promise<any>;
    crear(bod: any): Promise<any>;
    eliminar(id: Number): Promise<any>;
    editar(id: Number, datos: any): Promise<any>;
}
