import { Component, inject } from '@angular/core';
import { CrearAutoresService } from './crear-autores.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-autor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './crear-autores.component.html',
  styleUrls: ['./crear-autores.component.css'],
})
export class CrearAutorComponent {
  Nombre = '';

  aut: any;
  private Autor = inject(CrearAutoresService);

  ngOnInit() {
    this.Autor.traer_autor().subscribe((autores) => {
      this.aut = autores;
    });
  }

  crearAutor() {
    if (this.Nombre != '') {
      this.Autor.crearAutor({ nombre: this.Nombre }).subscribe({
      next:  () => {
          window.location.reload();
        },
        error: (error) => {
          console.error('Error al crear na:', error);
          // Maneja el error según tus necesidades
        }
       } );
    } else {
      alert('lo setimos faltan adatos');
    }
  }
  id_autor = 0;
  test(id: number) {
    this.id_autor = id;
  }

  eliminar() {
    return this.Autor.eliminar(this.id_autor).subscribe(() => {
      window.location.reload();
    });
  }
}
