import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.css'
})
export class BuscadorComponent {
  searchText: string = ''; // Inicializa searchText como una cadena vacía
  private router = inject(Router);

  buscar() {
    this.router.navigate(['/user/libro'], { queryParams: { texto: this.searchText , carrera:'' } });
  }

}
