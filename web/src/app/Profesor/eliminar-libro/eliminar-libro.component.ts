import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LibroService } from '../libro.service';

@Component({
  selector: 'app-eliminar-libro',
  templateUrl: './eliminar-libro.component.html',
  styleUrls: ['./eliminar-libro.component.css']
})
export class EliminarLibroComponent {
  libro: any;
  libroEliminado = false;
  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private libroService: LibroService
  ) { }

 

  Eliminar() {
    const libro_id = Number(this.route.snapshot.params['id'])
    this.libroService.eliminarLibro(libro_id);
    this.router.navigate(['/catalogo']);
   
  }

  cancelarEliminar() {
    this.router.navigate(['/catalogo']);
  }
}