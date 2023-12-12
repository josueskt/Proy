import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VistalibroService } from './vistalibro.service';


@Component({
  selector: 'app-vistalibro',
  templateUrl: './vistalibro.component.html',
  styleUrls: ['./vistalibro.component.css']
})
export class VistalibroComponent {
  id = '';
  libro: any;
  result: any;

  constructor(private route: ActivatedRoute, private vistalibroService: VistalibroService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log('ID de la ruta actual:', this.id);
      this.getLibroById(this.id);
    });
  }

  getLibroById(id: string): void {
    this.vistalibroService.traerTodas(id).subscribe(
      (data) => {
        console.log('libro', data);
        this.result = data;
        this.libro = this.result[0];
        this.libro.fecha_publ = this.formatearFecha(this.libro.fecha_publ)
        
        
      },
      error => {
        console.error('Error al obtener información del libro', error);
      }
    );
  }
  
  formatearFecha(fecha: string): string {
    const fechaObjeto = new Date(fecha);
    const año = fechaObjeto.getFullYear();
    const mes = ('0' + (fechaObjeto.getMonth() + 1)).slice(-2);
    const dia = ('0' + fechaObjeto.getDate()).slice(-2);
    
    return `${año}-${mes}-${dia}`;
  }


  descarga(archivo: string): void {
    this.vistalibroService.descarga(archivo).subscribe(
      (data: Blob) => {
        const blob = new Blob([data], { type: 'application/pdf' });
  
        // Crear un enlace para descargar el archivo
        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(blob);
        downloadLink.download = archivo; // El nombre del archivo es el mismo que el proporcionado al método
        downloadLink.click();
      },
      error => {
        console.error('Error al descargar el archivo', error);
      }
    );
  }
}  