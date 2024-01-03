import { Response } from 'express';
import { DescargaService } from './descarga.service';
export declare class DescargaController {
    private descarga;
    constructor(descarga: DescargaService);
    getPdf(res: Response, filename: string, id_user: any, id_libro: any): Promise<void>;
}
