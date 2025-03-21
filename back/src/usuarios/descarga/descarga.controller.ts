import { Controller, Get, NotFoundException, Query, Res, SetMetadata, UseGuards } from '@nestjs/common';
import * as fs from 'fs';
import { Response } from 'express';
import * as path from 'path';
//import { RolesGuard } from 'src/roles/roles.guard';
import { DescargaService } from './descarga.service';
import { MessageDto } from 'src/common/message.dto';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('descarga')
export class DescargaController {
  constructor(private descarga: DescargaService) {}

  @Get()
  @UseGuards(RolesGuard)
  @SetMetadata('roles', ['ADMINISTRADOR','PROFESOR' , 'ESTUDIANTE','BIBLIOTECA'])
  async getPdf(
    @Res() res: Response,
    @Query('filename') filename: string,
    @Query('id_user') id_user: string,
    @Query('id_libro') id_libro: number,
  ): Promise<void> {
    try {
      const pdfFileName = filename || 'archivo.pdf';
      const pdfPath = path.join(process.env.Docs, pdfFileName); 
      if (fs.existsSync(pdfPath)) {
        const pdfStream = fs.createReadStream(pdfPath);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader(
          'Content-Disposition',
          `attachment; filename=${pdfFileName}`,
        );
        pdfStream.pipe(res);
if(id_user != undefined && id_user){
  this.descarga.descargados(id_user, id_libro);
}
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
