import { MateriaService } from './materia.service';
import { materia } from './materia.interface';
export declare class MateriaController {
    materia: MateriaService;
    constructor(materia: MateriaService);
    trae(): Promise<any>;
    by_id(id: Number): Promise<any>;
    crear(bod: materia): Promise<any>;
    editar(id: Number, bod: materia): Promise<any>;
    eliminar(id: Number): Promise<any>;
}
