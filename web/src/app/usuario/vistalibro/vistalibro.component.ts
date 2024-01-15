import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VistalibroService } from './vistalibro.service';
import { UpperCasePipe } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vistalibro',
  standalone: true,
  imports: [UpperCasePipe],
  templateUrl: './vistalibro.component.html',
  styleUrls: ['./vistalibro.component.css'],
})
export class VistalibroComponent {
  id = '';
  libro: any;
  imagen:any
  result: any;
  urlSegura: any;
  pdfUrl: SafeResourceUrl | null = null;
  private sanitizer = inject(DomSanitizer);
  private route = inject(ActivatedRoute);
  private vistalibroService = inject(VistalibroService);
  private toastrService: ToastrService = inject(ToastrService);

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];

      this.getLibroById(this.id);
    });
  }

  
  eror_carga_imagen(){
    
    
    this.imagen = './assets/images/imagennoencontrada.png'
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
    this.vistalibroService.traerTodas(id).subscribe({
     next: (data) => {
        console.log('libro', data);
        this.result = data;
        this.libro = this.result[0];
        this.imagen = this.sanitizeUrl(this.libro.imagen)
        if(this.libro.tipo ==='PDF'){
        this.mostrar(this.libro.nombre_archivo, this.libro.id_libro)}
        this.cargarPDF();
      },
     error: (error) => {
        this.toastrService.error('Error al obtener información del libro', 'Fail', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      }
     } );
  }

  formatearFecha(fecha: string): string {
    const fechaObjeto = new Date(fecha);
    const año = fechaObjeto.getFullYear();
    const mes = ('0' + (fechaObjeto.getMonth() + 1)).slice(-2);
    const dia = ('0' + fechaObjeto.getDate()).slice(-2);

    return `${año}-${mes}-${dia}`;
  }
  mostrarPDF(pdfUrl: SafeResourceUrl): void {
    // Asignar la URL del Blob a una propiedad en tu componente
    this.pdfUrl = pdfUrl;
  }
// trae al servicio 
mostrar(archivo: string ,id_libro:string): void {
  this.vistalibroService.descarga(archivo,id_libro).subscribe({
   next: (data: Blob) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(blob);
      const sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(pdfUrl);

      // Mostrar el PDF en la plantilla (HTML)
      this.mostrarPDF(sanitizedUrl);

      
      
      
     
    },
   error: (error) => {
      this.toastrService.error('Error al mostrar el PDF','Fail', {
        timeOut: 3000,
        positionClass: 'toast-top-center',
      });
    }
   } );
}


//asd
  descarga(archivo: string ,id_libro:string): void {
    this.vistalibroService.descarga(archivo,id_libro).subscribe({
     next: (data: Blob) => {
        const blob = new Blob([data], { type: 'application/pdf' });
      
        

        
        
        // Crear un enlace para descargar el archivo
        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(blob);
        downloadLink.download = archivo; // El nombre del archivo es el mismo que el proporcionado al método
        downloadLink.click();
      },
     error: (error) => {
        this.toastrService.error('Error al descargar el archivo','Fail', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      }
     } );
  }
}  