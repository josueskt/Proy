import { GetLibroService } from './get_libro.service';
export declare class GetLibroController {
    private libro;
    constructor(libro: GetLibroService);
    libro_byid(id: Number): Promise<any>;
}
