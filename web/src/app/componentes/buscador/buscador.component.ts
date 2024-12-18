import { Component, Input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.css'
})
export class BuscadorComponent {
  searchText: string = ''; 
  private router = inject(Router);
  @Input() ruta = ''
  @Input() tipo = ''

  buscar() {
    if(this.ruta){
      this.router.navigate([this.ruta], { queryParams: { texto: this.searchText , carrera:'' ,tipo:this.tipo } });

    }else{

      this.router.navigate(['/user/libro'], { queryParams: { texto: this.searchText , carrera:'' } });
    }
  }

}
