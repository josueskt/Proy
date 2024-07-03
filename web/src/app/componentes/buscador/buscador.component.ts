import { Component, inject } from '@angular/core';
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

  buscar() {
    this.router.navigate(['/user/libro'], { queryParams: { texto: this.searchText , carrera:'' } });
  }

}
