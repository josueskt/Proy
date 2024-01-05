import { Controller, Get, Param, SetMetadata, UseGuards } from '@nestjs/common';
import { GetLibroService } from './get_libro.service';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('get-libro')
export class GetLibroController {
constructor(private libro:GetLibroService){}

    @Get(':id')
  //  @UseGuards(RolesGuard)
   // @SetMetadata('roles', ['ADMINISTRADOR','PROFESOR' , 'ESTUDIANTE'])
    libro_byid(@Param('id') id:Number){


        return this.libro.libro_byid(id)
    }
}
