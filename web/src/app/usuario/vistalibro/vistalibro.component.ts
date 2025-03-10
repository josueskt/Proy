import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VistalibroService } from './vistalibro.service';
import { UpperCasePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { BuscadorComponent } from '../../componentes/buscador/buscador.component';
import { Etiqueta } from '../../interfaces/Etiqueta.interface';
import { Libro } from '../../interfaces/libro.interface';
/* @vite-ignore */ 
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { LoaderComponent } from "../../componentes/loader/loader.component";

@Component({
  selector: 'app-vistalibro',
  standalone: true,
  imports: [UpperCasePipe, FormsModule, BuscadorComponent, PdfViewerModule, LoaderComponent],
  templateUrl: './vistalibro.component.html',
  styleUrls: ['./vistalibro.component.css'],
})
export class VistalibroComponent implements OnInit {
  constructor() {}
  zoomLevel = 1;
  id = '';
  imagen: string;
  etiquetas: Etiqueta[];
  libro: Libro;
  isLoading = false;

  pdfUrl: string | null = null;
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private vistalibroService = inject(VistalibroService);
  private toastrService: ToastrService = inject(ToastrService);
  searchText: string;
  loading = true
  full_loading = true
  error = false
  ngOnInit() {
  

    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.getLibroById(this.id);
      this.traer_etiquetas(this.id);

    });
  }


  zoomIn(): void {
    this.zoomLevel += 0.1; 
  }

  zoomOut(): void {
    if (this.zoomLevel > 0.1) { 
      this.zoomLevel -= 0.1;
    }
  }
  imagenCargada() {
    this.loading = false; 
  }

  eror_carga_imagen() {
   
      this.imagen = './assets/images/imagennoencontrada.png';
  }

  onPdfLoadComplete() {
    this.isLoading = false;
  }
  cargarPDF() {
    this.isLoading = true
    const url = this.
    libro.nombre_archivo;
    this.pdfUrl = url; 
  }

  traer_etiquetas(id: string) {
    this.vistalibroService.treer_etiqueta(id).subscribe({
      next: (res) => {
        this.etiquetas = res;
      },
    });
  }

  getLibroById(id: string): void {
    
    this.vistalibroService.traerTodas(id).subscribe({
      next: (data) => {
        this.libro = data[0];
        if (this.libro.tipo === 'PDF') {
          this.mostrar(this.libro.nombre_archivo, this.libro.id_libro);
        }
        const baseUrl = environment.URL;
        this.imagen = baseUrl + 'imagen?filename=' +this.libro.imagen ;
        this.cargarPDF();
        this.full_loading = false
      },
      error: () => {
        this.toastrService.error('Error al obtener información del libro', 'Fail', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      },
    });
  }
  buscar_etiqueta(nombre: string) {
    this.router.navigate(['user/libro'], { queryParams: { texto: nombre, carrera: '' } });
  }

  formatearFecha(fecha: string): string {
    const fechaObjeto = new Date(fecha);
    const año = fechaObjeto.getFullYear();
    const mes = ('0' + (fechaObjeto.getMonth() + 1)).slice(-2);
    const dia = ('0' + fechaObjeto.getDate()).slice(-2);
    return `${año}-${mes}-${dia}`;
  }

  mostrarPDF(pdfUrl: string): void {
    this.pdfUrl = pdfUrl;
  }
  mostrar(archivo: string, id_libro: string): void {
    this.vistalibroService.descarga(archivo, id_libro).subscribe({
      next: (data: Blob) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(blob); 
        this.pdfUrl = pdfUrl; 
      },
      error: () => {
        this.toastrService.error('Error al mostrar el PDF', 'Fail', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      },
    });
  }
}
