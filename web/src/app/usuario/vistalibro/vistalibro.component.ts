import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VistalibroService } from './vistalibro.service';
import { UpperCasePipe } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-vistalibro',
  standalone: true,
  imports: [UpperCasePipe],
  templateUrl: './vistalibro.component.html',
  styleUrls: ['./vistalibro.component.css']
})
export class VistalibroComponent {
  id = '';
  libro: any;
  result: any;
  urlSegura:any
  private sanitizer = inject(DomSanitizer) 
  private route=inject(  ActivatedRoute) 
  private vistalibroService=inject(  VistalibroService)

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      
      this.getLibroById(this.id);
      
    });
    
  }
  
  
  cargarPDF() {
    const url = this.libro.nombre_archivo;
     this.urlSegura = this.sanitizeUrl(url);
    
    // Ahora puedes usar urlSegura en tu plantilla
  }
  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getLibroById(id: string): void {
    this.vistalibroService.traerTodas(id).subscribe(
      (data) => {
        console.log('libro', data);
        this.result = data;
        this.libro = this.result[0];
       
        this.cargarPDF()
        
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


//asd
  descarga(archivo: string ,id_libro:string): void {
    this.vistalibroService.descarga(archivo,id_libro).subscribe(
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