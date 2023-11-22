import { Controller, Get, Param } from '@nestjs/common';
import { GetLibroService } from './get_libro.service';

@Controller('get-libro')
export class GetLibroController {
constructor(private libro:GetLibroService){}

    @Get(':id')
    libro_byid(@Param('id') id:Number){


        return this.libro.libro_byid(id)
    }
}
