import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { InformeRegistro } from '../../../interfaces/informe_registro.interface';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class InformeingresoService {

  base = environment.URL;

  private reporteurl = `${this.base}salida`;

  constructor(private http: HttpClient ) {}


treaer_registro(){
  return this.http.get(`${this.reporteurl}/historial`)
}

  generateExcel(informe:InformeRegistro[]): void {
    // Map the data to the format required by xlsx
    const data = informe.map(info => ({
      ID: info.id_ingreso,
      hora_salida: info.hora_salida,
      hora_entrada: info.hora_entrada,
      actividad: info.actividad,
      actividad_s: info.actividad_s,
      carrera: info.carrera,
      email: info.email,
      jornada: info.jornada,
      nivel: info.nivel,
      paralelo: info.paralelo,
      usuario: info.usuario,
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



  public generatePdf(contentId: string): void {
    const data = document.getElementById(contentId);

    if (data) {
      html2canvas(data).then(canvas => {
        const imgWidth = 208;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        const contentDataURL = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        pdf.save('informe de ingreso.pdf');
      });
    }
  }
}
