import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LibroService } from '../libro.service';

@Component({
  selector: 'app-eliminar-libro',
  templateUrl: './eliminar-libro.component.html',
  styleUrls: ['./eliminar-libro.component.css']
})
export class EliminarLibroComponent implements OnInit {
  libro: any;
  libroEliminado: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private libroService: LibroService
  ) { }

  ngOnInit() {
    const libroId = Number(this.route.snapshot.params['id']);
    this.libro = this.libroService.getLibro(libroId);
  }

  confirmarEliminar() {
    this.libroService.eliminarLibro(this.libro.id);
    this.libroEliminado = true;

    setTimeout(() => {
      this.router.navigate(['/catalogo']);
    }, 2000);
  }

  cancelarEliminar() {
    this.router.navigate(['/catalogo']);
  }
}