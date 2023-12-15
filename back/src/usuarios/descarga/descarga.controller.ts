import { Controller, Get, Query, Res, SetMetadata, UseGuards } from '@nestjs/common';
import * as fs from 'fs';
import { Response, query } from 'express';
import * as path from 'path';
import { RolesGuard } from 'src/roles/roles.guard';
import { DescargaService } from './descarga.service';



@Controller('descarga')
export class DescargaController {
  constructor( private descarga : DescargaService){}

  @Get()
  //@UseGuards(RolesGuard)
  //@SetMetadata('roles', ['ADMINISTRADOR','PROFESOR' , 'ESTUDIANTE'])
  async getPdf(@Res() res: Response, @Query('filename') filename: string, @Query('id_user') id_user: any ,@Query('id_libro') id_libro: any  ): Promise<void> {
    try{
    const pdfFileName = filename || 'archivo.pdf';
    const pdfPath = path.join('/home/k1/Escritorio/proyecto_int/Proy/back/src/pdfs', pdfFileName); // Ajusta la ruta según tu estructura

    if (fs.existsSync(pdfPath)) {
      const pdfStream = fs.createReadStream(pdfPath);

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=${pdfFileName}`);

      pdfStream.pipe(res);

this.descarga.descargados(id_user,id_libro)


    } else {
      res.status(404).send('Archivo no encontrado');
    }
  }catch(error){
    throw error
  }

  }
}
