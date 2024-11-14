import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VistalibroService } from './vistalibro.service';
import { UpperCasePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from '../home/home.service';
import { DataService } from '../data.service';
import { environment } from '../../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { BuscadorComponent } from '../../componentes/buscador/buscador.component';
import { Etiqueta } from '../../interfaces/Etiqueta.interface';
import { Libro } from '../../interfaces/libro.interface';
/* @vite-ignore */ 
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-vistalibro',
  standalone: true,
  imports: [UpperCasePipe, FormsModule, BuscadorComponent,PdfViewerModule],
  templateUrl: './vistalibro.component.html',
  styleUrls: ['./vistalibro.component.css'],
})
export class VistalibroComponent implements OnInit {
  constructor() {}

  id = '';
  imagen: string;
  etiquetas: Etiqueta[];
  libro: Libro;
  isLoading = false;

  pdfUrl: string | null = null;
  private route = inject(ActivatedRoute);
  private dataService = inject(DataService);
  private homeService = inject(HomeService);
  private router = inject(Router);

  private vistalibroService = inject(VistalibroService);
  private toastrService: ToastrService = inject(ToastrService);
  searchText: string;
  loading = true
  error = false
  ngOnInit() {
  

    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.getLibroById(this.id);
      this.traer_etiquetas(this.id);
    });
  }



  imagenCargada() {
    this.loading = false;  // Deja de mostrar el loader
  }

  eror_carga_imagen() {
   // this.loading = true
    // if (!this.imagen.includes('http://')) {
    //   const baseUrl = environment.URL;
    //   this.imagen = baseUrl + 'imagen?filename=' + this.imagen;
    // } else {
      this.imagen = './assets/images/imagennoencontrada.png';
    //}
  }

  onPdfLoadComplete() {
    this.isLoading = false;
  }
  cargarPDF() {
    this.isLoading = true
    const url = this.
    libro.nombre_archivo;
    this.pdfUrl = url; // Asigna directamente la URL al pdfUrl
  }

  traer_etiquetas(id: string) {
    this.vistalibroService.treer_etiqueta(id).subscribe({
      next: (res) => {
        this.etiquetas = res;
        console.log(res);
      },
    });
  }

  getLibroById(id: string): void {
    
    this.vistalibroService.traerTodas(id).subscribe({
      next: (data) => {
        this.libro = data[0];
      //  this.imagen = this.libro.imagen;
    
        if (this.libro.tipo === 'PDF') {
          this.mostrar(this.libro.nombre_archivo, this.libro.id_libro);
        }
        const baseUrl = environment.URL;

        this.imagen = baseUrl + 'imagen?filename=' +this.libro.imagen ;
        this.cargarPDF();
      
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
    this.router.navigate(['/user/libro'], { queryParams: { texto: nombre, carrera: '' } });

    this.homeService.buscarLibros(nombre, '', 1).subscribe({
      next: (resultados) => {
        this.dataService.setResultados(resultados);
        this.router.navigate(['/user/libro']);
      },
      error: () => {
        this.toastrService.error('Error al buscar libros:', 'Fail', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      },
    });
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
