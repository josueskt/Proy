import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute,Router,RouterLink } from '@angular/router';
import { NgClass, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { HomeService } from '../home/home.service';
import { ToastrService } from 'ngx-toastr';
import { BuscadorComponent } from '../../componentes/buscador/buscador.component';
import { Libro } from '../../interfaces/libro.interface';
import { LoaderComponent } from "../../componentes/loader/loader.component";

@Component({
  selector: 'app-libro',
  standalone: true,
  imports: [RouterLink, UpperCasePipe, FormsModule,   LoaderComponent],
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css'],
})
export class LibroComponent implements OnInit {
  resultados:Libro [] = [];
 
  itemsPerPage = 12;
  totalPages =0;
  pagina = 1;
   baseUrl = environment.URL;

   full_loader = true

url =   environment.URL + 'imagen?filename=' 
  @ViewChild('contenedorLibros') contenedorLibros!: ElementRef;
  private dataService = inject(DataService);
  private homeService = inject(HomeService)
  private toastrService: ToastrService = inject(ToastrService);
  private route = inject(ActivatedRoute)
  private router=inject(  Router)

  texto = ''
  carrera = ''
searchText: string;

  async ngOnInit() {


     this.texto = this.route.snapshot.queryParamMap.get('texto');
     this.carrera = this.route.snapshot.queryParamMap.get('carrera');

    await this.resultados_libros(this.pagina,this.texto)
    
    
   
  }

 


hola(id){
  this.router.navigate(['/user/libro',id]);
  
}
buscar(){
  this.resultados_libros(this.pagina,this.searchText)
}

  nextPage() {
    this.pagina ++
    this.resultados_libros(this.pagina,this.texto)
  
  }

  previousPage() {
    this.pagina --
    this.resultados_libros(this.pagina ,this.texto )
  
  }

 

  goToPage(page: number) {
    this.pagina = page
   this.resultados_libros(page,this.texto)


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
 


resultados_libros(pagina:number,buscado){
  this.homeService.buscarLibros(buscado, this.carrera , pagina).subscribe({
    next: (resultados) => {



       this.dataService.setResultados(resultados);


       this.dataService.resultados$.subscribe((resultados) => {
        this.resultados = resultados;
      });
      this.homeService.index(this.texto).subscribe((e)=>{


        this.totalPages = Math.ceil(e[0].count / this.itemsPerPage);
        this.full_loader = false
      })
     },
    error: (error) => {
       this.toastrService.error('Error al buscar libros:'+error, 'Fail', {
         timeOut: 3000,
         positionClass: 'toast-top-center',
       });}

      })
    }
  
}
