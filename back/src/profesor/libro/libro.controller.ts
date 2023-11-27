import { Body, Controller, Delete, Get, Param, Post, Put, Query, SetMetadata, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { LibroService } from './libro.service';
import { RolesGuard } from 'src/roles/roles.guard';
import { Libro } from './libro.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { Libro_Upload } from 'src/dto/libro_upload.dto';

@Controller('libro')
export class LibroController {

    constructor(public carrera:LibroService){

    }

    @Get()
    //@UseGuards(RolesGuard)
   // @SetMetadata('roles', ['PROFESOR'])
    Traer_todos(@Query('nombre') nombre:String) {
        console.log(nombre)

        return this.carrera.traer(nombre)

    }
    @Get(":id")
    //@UseGuards(RolesGuard)
    //@SetMetadata('roles', ['PROFESOR'])
    by_id(@Param("id") id: Number) {
        return this.carrera.by_id(id)
    }
        @Post()
       // @UsePipes(ValidationPipe)
        //@UseInterceptors(FileInterceptor('file'))
        async crear(
        @UploadedFile() file: any,@Body('libro') libro:Libro_Upload 
        ): Promise<{ message: string, newFileName: string }> {
            console.log(libro.titulo)
        try {
            
            // Llama al servicio para crear el libro con el archivo PDF
            const message = await this.carrera.crear(libro, file);
    
            return { message, newFileName: /* Nombre del archivo generado en el servicio */'gg' }
        } catch (error) {
            // Manejo de errores si es necesario
            console.log(error)
            return { message: 'Error al procesar la solicitud', newFileName: '' };
        }
        }
  
    @Delete(":id")
    //@UseGuards(RolesGuard)
    //@SetMetadata('roles', ['PROFESOR'])
    eliminar(@Param("id") id :Number ) {
     return this.carrera.eliminar(id)


    }
    @Put(":id")
    //@UseGuards(RolesGuard)
    //@SetMetadata('roles', ['PROFESOR'])
    editar(@Param("id") id :Number , @Body( ) datos:any) {
        const ap = datos.nombre
        return this.carrera.editar(id , ap)

    }


}
