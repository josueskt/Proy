import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
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
  constructor(public libro: LibroService) {}

  @Get()
  @UseGuards(RolesGuard)
  @SetMetadata('roles', ['PROFESOR'])
  Traer_todos(@Body('nombre') datos, @Query('page') pagina: number) {
    return this.libro.traer(datos,pagina);
  }
  @Get(':id')
  @UseGuards(RolesGuard)
  @SetMetadata('roles', ['PROFESOR', 'ADMINISTRADOR', 'ESTUDIANTE'])
  by_id(@Param('id') id: number) {
    return this.libro.by_id(id);
  }
  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('file'))
  async crear(
    @UploadedFile() file: Express.Multer.File[],
    @Body('libro') libro: Libro,
  ): Promise<{ message: string; newFileName: string }> {
    try {
      // Llama al servicio para crear el libro con el archivo PDF
      

      const message = await this.libro.crear(libro, file);

      return {
        message,
        newFileName:  'libro creado',
      };
    } catch (error) {
      

      return { message: 'Error al procesar la solicitud', newFileName: '' };
    }
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @SetMetadata('roles', ['PROFESOR','ADMINISTRADOR'])
  eliminar(@Param('id') id: string) {
    return this.libro.eliminar(id);
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
  
  const li =  JSON.parse(libro);

 return this.libro.editar(li,files)
  
  
 
}
}
