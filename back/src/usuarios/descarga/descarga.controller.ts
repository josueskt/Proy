import { Controller, Get, Query, Res } from '@nestjs/common';
import * as fs from 'fs';
import { Response } from 'express';
import * as path from 'path';


@Controller('descarga')
export class DescargaController {

  @Get()
  async getPdf(@Res() res: Response, @Query('filename') filename: string): Promise<void> {
    try{
    const pdfFileName = filename || 'archivo.pdf';
    const pdfPath = path.join('/home/k2/Escritorio/pro_int/Proy/back/src/pdfs/', pdfFileName); // Ajusta la ruta según tu estructura

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
