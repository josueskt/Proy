import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LibroService } from '../libro.service';

@Component({
  selector: 'app-eliminar-libro',
  templateUrl: './eliminar-libro.component.html',
  styleUrls: ['./eliminar-libro.component.css'],
})
export class EliminarLibroComponent {
  libro: any;
  libroEliminado = false;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private libroService = inject(LibroService);

  Eliminar() {
    const libro_id = Number(this.route.snapshot.params['id']);
    this.libroService.eliminarLibro(libro_id);
    this.router.navigate(['/profe']);
  }

  cancelarEliminar() {
    this.router.navigate(['/profe']);
  }
}
