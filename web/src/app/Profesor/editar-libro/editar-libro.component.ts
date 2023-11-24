import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LibrosService } from '../libro.service';


@Component({
  selector: 'app-editar-libro',
  templateUrl: './editar-libro.component.html',
  styleUrls: ['./editar-libro.component.css']
})
export class EditarLibroComponent implements OnInit {
  libroForm: FormGroup;
  libro: any;
  guardadoExitoso: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private librosService: LibrosService,
    private formBuilder: FormBuilder
  ) { 
    this.libroForm = this.formBuilder.group({});
  }

  ngOnInit() {
    const libroId = Number(this.route.snapshot.params['id']);
    this.libro = this.librosService.getLibro(libroId);

    this.libroForm = this.formBuilder.group({
      titulo: [this.libro.titulo, Validators.required],
      fechaPublicacion: [this.libro.fechaPublicacion, Validators.required],
      paginas: [this.libro.paginas, Validators.required],
      autor: [this.libro.autor, Validators.required],
      materia: [this.libro.materia, Validators.required],
      carreras: [this.libro.carreras, Validators.required],
      descripcion: [this.libro.descripcion, Validators.required]
    });
  }

  guardarCambios() {
    if (this.libroForm.valid) {
      this.libro = { ...this.libro, ...this.libroForm.value };
      this.librosService.actualizarLibro(this.libro);
      // Aquí puedes agregar lógica adicional, como navegar a la página de detalles del libro actualizado

      this.guardadoExitoso = true;
    }
  }
}