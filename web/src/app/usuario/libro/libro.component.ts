import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgClass, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { HomeService } from '../home/home.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-libro',
  standalone: true,
  imports: [RouterLink, UpperCasePipe, FormsModule, NgClass],
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css'],
})
export class LibroComponent implements OnInit {
  resultados: any[] = [];
 
  itemsPerPage = 12;
  totalPages =0;
  pagina = 1;

  @ViewChild('contenedorLibros') contenedorLibros!: ElementRef;
  private dataService = inject(DataService);
  private homeService = inject(HomeService)
  private toastrService: ToastrService = inject(ToastrService);
  private route = inject(ActivatedRoute)

  libro: any;
  texto = ''
  carrera = ''

  async ngOnInit() {


     this.texto = this.route.snapshot.queryParamMap.get('texto');
     this.carrera = this.route.snapshot.queryParamMap.get('carrera');

    await this.resultados_libros(this.pagina)
    
    
   
  }

  eror_carga_imagen(libro) {
    if (!libro.imagen.includes("http://")) {
      const baseUrl = environment.URL;
      libro.imagen = baseUrl + 'imagen?filename=' + libro.imagen;
    } else {
      libro.imagen = './assets/images/imagennoencontrada.png';
    }
  }

  sanitizeUrl(arg0: string): any {
    throw new Error('Method not implemented.');
  }



  nextPage() {
    this.pagina ++
    this.resultados_libros(this.pagina)
  
  }

  previousPage() {
    this.pagina --
    this.resultados_libros(this.pagina  )
  
  }

 

  goToPage(page: number) {
    this.pagina = page
   this.resultados_libros(page)


  }
  visiblePages(): number[] {
    const pagesToShow = 5;
    const pages: number[] = [];
  
    if (this.totalPages <= pagesToShow) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      const middle = Math.ceil(pagesToShow / 2);
      let startPage = this.pagina - middle + 1;
      let endPage = startPage + pagesToShow - 1;
  
      if (startPage <= 0) {
        startPage = 1;
        endPage = pagesToShow;
      } else if (endPage > this.totalPages) {
        endPage = this.totalPages;
        startPage = endPage - pagesToShow + 1;
      }
  
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
  
    return pages;
  }
 


resultados_libros(pagina:number){
  this.homeService.buscarLibros(this.texto, this.carrera , pagina).subscribe({
    next: (resultados) => {



       this.dataService.setResultados(resultados);


       this.dataService.resultados$.subscribe((resultados) => {
        this.resultados = resultados;
        console.log(resultados)
      });
      this.homeService.index(this.texto,this.carrera).subscribe((e)=>{


        console.log(e)
        this.totalPages = Math.ceil(e[0].count / this.itemsPerPage);
      })
     },
    error: (error) => {
       this.toastrService.error('Error al buscar libros:', 'Fail', {
         timeOut: 3000,
         positionClass: 'toast-top-center',
       });}

      })
    }
  
}
