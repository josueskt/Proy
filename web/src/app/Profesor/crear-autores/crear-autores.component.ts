import { Component, inject } from '@angular/core';

import { NacionalidadService } from 'src/app/Administrador/nacionalidad.service';
import { CrearAutoresService } from './crear-autores.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-autor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './crear-autores.component.html',
  styleUrls: ['./crear-autores.component.css']
})
export class CrearAutorComponent {
  Nombre= "";
  na = "";
  nacionalida:any
  aut:any
  
   private nacionalidad=inject(NacionalidadService)
    private Autor=inject( CrearAutoresService)
    
  
  ngOnInit() {
    this.nacionalidad.traerTodas().subscribe((carreras) => {
     
      this.nacionalida = carreras
       

    })
    this.Autor.traer_autor().subscribe((autores) => {
     this.aut = autores
      
       

    });
  
  }
  
 



crearAutor() {
  if(this.Nombre !="" && this.na){

 
  this.Autor.crearAutor({nombre : this.Nombre , nacionalidad:this.na}).subscribe(
    () => {
      
      window.location.reload();
    },
    (error) => {
      console.error('Error al crear na:', error);
      // Maneja el error según tus necesidades
    }
  );

}else{
  alert("lo setimos faltan adatos")
}
}
id_autor = 0
test(id:number){
this.id_autor = id
}

eliminar(){
  return this.Autor.eliminar(this.id_autor).subscribe(()=>{
    window.location.reload();

  })

}
}