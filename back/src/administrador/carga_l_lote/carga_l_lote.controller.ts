import { Controller, Post, Body, Put } from '@nestjs/common';
import { CargaLLoteService } from './carga_l_lote.service';

@Controller('carga-l-lote')
export class CargaLLoteController {
  constructor(private readonly fileService: CargaLLoteService) { }

  @Post()
  async carga_por_lote(@Body() body: any) {
    const datos = body.datos;
    const id = body.id_user.id_user  
    

    let index = 0;
    try{
      do {
        const dato = datos[index];
      
        if (dato.titulo) {
          
        this.fileService.libros_bloque(dato, id)
         
        }
      
        index++;
      } while (index < datos.length);
      console.log("libros creados")
 return {"mesage":"libros creados"}
    }catch(error){
      return error
    }


   

  }

}
