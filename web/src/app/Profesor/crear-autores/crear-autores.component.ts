import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-autor',
  templateUrl: './crear-autores.component.html',
  styleUrls: ['./crear-autores.component.css']
})
export class CrearAutorComponent {
  Nombre: string;
  Pais: string;
  
  constructor(private router: Router) {
    this.Nombre = '';
    this.Pais = '';
  }
  
  crearAutor() {
    if (this.Nombre && this.Pais) {
      // Lógica para crear el autor
      
      alert('Autor creado');
    this.router.navigate(['/catalogo']);
  }
}
}