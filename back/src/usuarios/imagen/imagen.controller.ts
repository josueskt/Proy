import { Controller, Get, NotFoundException, Query, Res, SetMetadata, UseGuards } from '@nestjs/common';
import * as path from 'path';
import { MessageDto } from 'src/common/message.dto';
const fs = require('fs');
import { Response } from 'express';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('imagen')
export class ImagenController {

    @Get()
   // @UseGuards(RolesGuard)
   // @SetMetadata('roles', ['ADMINISTRADOR','PROFESOR' , 'ESTUDIANTE'])
    async getPdf(
      @Res() res: Response,
      @Query('filename') filename: string,
      
    ): Promise<void> {
      try {
        const pdfFileName = filename ;
   
        const pdfPath = path.join(process.env.Docs, pdfFileName); // Ajusta la ruta según tu estructura
  
        if (fs.existsSync(pdfPath)) {
          const pdfStream = fs.createReadStream(pdfPath);
          res.setHeader('Content-Type', 'image/webp');
          res.setHeader(
            'Content-Disposition',
            `attachment; filename=${pdfFileName}`,
          );
          pdfStream.pipe(res);
  
          
        } else {
          res.status(404).send('Archivo no encontrado');
        }
      } catch (error) {
        throw new NotFoundException(
          new MessageDto(`Error al descargar el archivo, error: ${error}`),
        );
      }
    }



}
