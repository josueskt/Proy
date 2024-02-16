import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  SetMetadata,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LibroService } from './libro.service';
import { RolesGuard } from 'src/roles/roles.guard';
import { Libro } from './libro.interface';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';

@Controller('libro')
export class LibroController {
  constructor(public carrera: LibroService) {}

  @Get()
  @UseGuards(RolesGuard)
  @SetMetadata('roles', ['PROFESOR'])
  Traer_todos(@Body('nombre') datos) {
    return this.carrera.traer(datos);
  }
  @Get(':id')
  @UseGuards(RolesGuard)
  @SetMetadata('roles', ['PROFESOR', 'ADMINISTRADOR', 'ESTUDIANTE'])
  by_id(@Param('id') id: number) {
    return this.carrera.by_id(id);
  }
  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('file'))
  async crear(
    @UploadedFile() file: any,
    @Body('libro') libro: Libro,
  ): Promise<{ message: string; newFileName: string }> {
    try {
      // Llama al servicio para crear el libro con el archivo PDF
      

      const message = await this.carrera.crear(libro, file);

      return {
        message,
        newFileName: /* Nombre del archivo generado en el servicio */ 'libro creado',
      };
    } catch (error) {
      // Manejo de errores si es necesario

      return { message: 'Error al procesar la solicitud', newFileName: '' };
    }
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @SetMetadata('roles', ['PROFESOR','ADMINISTRADOR'])
  eliminar(@Param('id') id: string) {
    return this.carrera.eliminar(id);
  }
  
 @Patch(':id')
 
@UseInterceptors(FileFieldsInterceptor([
  { name: 'image', maxCount: 1 },
  { name: 'file', maxCount: 1 },
]))
editar(
  @Body('libro') libro:string,

  @UploadedFiles() files: { image: Express.Multer.File[], file?: Express.Multer.File[] },

  @Param('id') id: number,
) {
  
  const a =  JSON.parse(libro);

  console.log("imagen", files.image);
  console.log("file", files.file);
  console.log("libros", a.testeo);
  
 
}
}
