import { Controller, Post, Body } from '@nestjs/common';
import { CargaLLoteService } from './carga_l_lote.service';
// Ajusta la ruta según la ubicación de tu servicio

@Controller('carga-l-lote')
export class CargaLLoteController {
  constructor(private readonly fileService: CargaLLoteService) { }

  @Post()
  async carga_por_lote(@Body() body: any) {
    const datos = body.datos;
    const id = body.id_user.id_user

    
    for (const dato of datos) {
      if (dato.titulo) {
        
        this.fileService.libros_bloque(dato, id)
      }
    }



  }



}
