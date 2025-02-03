import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {

  base = environment.URL;
  private baseUrl =  `${this.base}estadisticas/reporte`;
  location: any;

  constructor(private http: HttpClient) { }
  imprimir_estadisticas_ingreso(fecha , fechaf): Observable<any> {
if(fecha){

  return this.http.get(`${this.baseUrl}?fecha_inico=${fecha}&fecha_fin=${fechaf}`);
}
return this.http.get(`${this.baseUrl}`);

  }

  imprimir_estadisticas_prestamos(fecha , fechaf): Observable<any> {
    if(fecha){
    
      return this.http.get(`${this.baseUrl}/prestamos?fecha_inico=${fecha}&fecha_fin=${fechaf}`);
    }
    return this.http.get(`${this.baseUrl}`);
    
      }



  generateExcel(libros: any[]): void {
    // Map the data to the format required by xlsx
    const data = libros.map(libro => ({
      fecha:libro.fecha,
      correo:libro.email,
      cedula:libro.cedula,
      rol:libro.rol,
      ususario:libro.usuario,
      carrera:libro.carrera
    }));

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

    // Create a workbook and add the worksheet
    const workbook: XLSX.WorkBook = {
      Sheets: { 'Libros': worksheet },
      SheetNames: ['Libros']
    };

    // Write the workbook to a file
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Save the file
    this.saveAsExcelFile(excelBuffer, 'estadisticas');
  }

  generateExcelPrestamos(libros: any[]): void {
    // Map the data to the format required by xlsx
    const data = libros.map(libro => ({
      fecha_reserva:libro.fecha_reserva,
      fecha_devolucion:libro.feha_real_devolcion,
      observaciones:libro.observaciones,
      prestado_por:libro.nombre,
      codigo:libro.codigo,
      titulo:libro.titulo
      
    }));

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

    // Create a workbook and add the worksheet
    const workbook: XLSX.WorkBook = {
      Sheets: { 'Libros': worksheet },
      SheetNames: ['Libros']
    };

    // Write the workbook to a file
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Save the file
    this.saveAsExcelFile(excelBuffer, 'estadisticas');
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

 

