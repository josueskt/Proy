import { Controller, Get, NotFoundException, Query, Res } from '@nestjs/common';
import * as path from 'path';
import { MessageDto } from 'src/common/message.dto';
import * as fs from 'fs';
import { Response } from 'express';
import sharp from 'sharp';

@Controller('imagen')
export class ImagenController {

  @Get()
  async getPdf(
    @Res() res: Response,
    @Query('filename') filename: string,
  ): Promise<void> {
    if(filename){
      try {
        const pdfFileName = filename;
        const pdfPath = path.join(process.env.Docs, pdfFileName); 
  
        if (fs.existsSync(pdfPath)) {
          const pdfStream = fs.createReadStream(pdfPath);
          res.setHeader('Content-Type', 'image/webp'); 
          res.setHeader(
            'Content-Disposition',
            `attachment; filename=${pdfFileName}`,
          );
          pdfStream.pipe(sharp().webp({ quality: 1  })).pipe(res); 
        } else {
          res.status(404).send('Archivo no encontrado');
        }
      } catch (error) {
        throw new NotFoundException(
          new MessageDto(`Error al descargar el archivo, error: ${error}`),
        );
      }
    }else{
      res.status(404).send('imagen no encontrada');

    }
  
  }
}
