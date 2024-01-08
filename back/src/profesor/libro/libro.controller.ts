import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  SetMetadata,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LibroService } from './libro.service';
import { RolesGuard } from 'src/roles/roles.guard';
import { Libro } from './libro.interface';
import { FileInterceptor } from '@nestjs/platform-express';

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
        newFileName: /* Nombre del archivo generado en el servicio */ 'gg',
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
  @Put(':id')
  @UseGuards(RolesGuard)
  @SetMetadata('roles', ['PROFESOR'])
  editar(@Param('id') id: number, @Body() datos: any) {
    const ap = datos.nombre;
    return this.carrera.editar(id, ap);
  }
}
