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

    // Join all the parameters with '&'
    url += params.join('&');

    return this.http.get(url);
  }

  generateExcel(libros: Libro[]): void {
    // Map the data to the format required by xlsx
    const data = libros.map(libro => ({
        ID: libro.id_libro,
        Titulo: libro.titulo,
        Año_Publicacion: libro.year_of_publication,
       codigo:libro.codigo,
        Carrera: libro.carrera,
        Autor: libro.autor,
        Tipo: libro.tipo
    }));

    // Create a worksheet
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

    // Create a workbook and add the worksheet
    const workbook: XLSX.WorkBook = {
      Sheets: { 'Libros': worksheet },
      SheetNames: ['Libros']
    };

    // Write the workbook to a file
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Save the file
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
