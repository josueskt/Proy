import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Libro } from '../../interfaces/libro.interface';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ReportelibroService {
  base = environment.URL;
  private reporteurl = `${this.base}reporte-libro`;
  constructor(private http: HttpClient ) {}
  reporte(carrera?: number, tipo?: number) {
    let url = `${this.reporteurl}?`;
    const params = [];
    if (carrera) {
        params.push(`carrera=${carrera}`);
    }
    if (tipo) {
        params.push(`tipo=${tipo}`);
    }
    url += params.join('&');
    return this.http.get(url);
  }
  generateExcel(libros: Libro[]): void {
    const data = libros.map(libro => ({
        ID: libro.id_libro,
        Titulo: libro.titulo,
        Isbn:libro.isbn,
        Año_Publicacion: libro.year_of_publication,
       codigo:libro.codigo,
        Carrera: libro.carrera,
        Autor: libro.autor,
        Tipo: libro.tipo,
        Descargas:libro.total_descargas,
        subidopor: libro.profesor
    }));
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'Libros': worksheet },
      SheetNames: ['Libros']
    };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'libros');
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(data);
    link.download = `${fileName}_${new Date().getTime()}${EXCEL_EXTENSION}`;
    link.click();
  }
}
