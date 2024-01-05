import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-tipo-libro',
  templateUrl: './tipo-libro.component.html',
  styleUrls: ['./tipo-libro.component.css']
})

export class TipoLibroComponent implements OnInit {
  libroForm: FormGroup;
  errorAlerta = false;
  Alertabien = false;
  tiposLibro: any[] = []; // Aquí se almacenarán los tipos de libro creados

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.libroForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      tipo: ['', Validators.required]
    });
  }

  generarTipoLibro() {
    if (this.libroForm.valid) {
      const nombreIngresado = this.libroForm.value.nombre;
      const tipoSeleccionado = this.libroForm.value.tipo;

      if (tipoSeleccionado === 'url') {
        console.log('Tipo de libro URL');
      } else if (tipoSeleccionado === 'descarga') {
        console.log('Tipo de libro Descarga');
      } else if (tipoSeleccionado === 'fisico') {
        console.log('Tipo de libro Físico');
      }

      // Agregamos el tipo de libro a la lista
      this.tiposLibro.push({ nombre: nombreIngresado });

      // Reiniciamos el formulario
      this.libroForm.reset();

      // Mostramos el mensaje de éxito
      this.Alertabien = true;
      setTimeout(() => {
        this.Alertabien = false;
      }, 4000);
    } else {
      this.errorAlerta = true;
      setTimeout(() => {
        this.errorAlerta = false;
      }, 4000);
    }
  }

  eliminarTipoLibro(index: number) {

    this.tiposLibro.splice(index, 1);
  }
}