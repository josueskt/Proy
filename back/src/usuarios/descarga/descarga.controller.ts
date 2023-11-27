import { Controller, Get, Query, Res, SetMetadata, UseGuards } from '@nestjs/common';
import * as fs from 'fs';
import { Response } from 'express';
import * as path from 'path';
import { RolesGuard } from 'src/roles/roles.guard';


@Controller('descarga')
export class DescargaController {

  @Get()
  @UseGuards(RolesGuard)
  @SetMetadata('roles', ['ADMINISTRADOR','PROFESOR' , 'ESTUDIANTE'])
  async getPdf(@Res() res: Response, @Query('filename') filename: string): Promise<void> {
    try{
    const pdfFileName = filename || 'archivo.pdf';
    const pdfPath = path.join('C:/Users/K1/Desktop/proyecto/Proy/back/src/pdfs', pdfFileName); // Ajusta la ruta según tu estructura

    if (fs.existsSync(pdfPath)) {
      const pdfStream = fs.createReadStream(pdfPath);

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=${pdfFileName}`);

      pdfStream.pipe(res);
    } else {
      res.status(404).send('Archivo no encontrado');
    }
  }catch(error){
    throw error
  }

  }
}
