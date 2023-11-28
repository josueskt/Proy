import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NacionalidadService } from 'src/app/Administrador/nacionalidad.service';
import { CrearAutoresService } from './crear-autores.service';

@Component({
  selector: 'app-crear-autor',
  templateUrl: './crear-autores.component.html',
  styleUrls: ['./crear-autores.component.css']
})
export class CrearAutorComponent {
  Nombre: string = "";
  na: string = "";
  nacionalida:any
  aut:any
  
  constructor(private router: Router , private nacionalidad:NacionalidadService , private Autor:CrearAutoresService) {
    
  }
  ngOnInit() {
    this.nacionalidad.traerTodas().subscribe((carreras) => {
      console.log('Carreras:', carreras);
      this.nacionalida = carreras
       

    })
    this.Autor.traer_autor().subscribe((autores) => {
     this.aut = autores
      
       

    });
  
  }
  
 



crearAutor() {
  console.log()
  this.Autor.crearAutor({nombre :  this.Nombre , nacionalidad:this.na}).subscribe(
    () => {
      console.log('na creada con éxito');
      window.location.reload();
    },
    (error) => {
      console.error('Error al crear na:', error);
      // Maneja el error según tus necesidades
    }
  );
}
}