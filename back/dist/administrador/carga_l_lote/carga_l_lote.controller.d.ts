import { CargaLLoteService } from './carga_l_lote.service';
export declare class CargaLLoteController {
    private readonly fileService;
    constructor(fileService: CargaLLoteService);
    carga_por_lote(body: any): Promise<void>;
}
