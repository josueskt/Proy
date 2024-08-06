import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IngresoService } from './ingreso.service';
import { Usuario } from '../../interfaces/usuario.interface';
import { Por_salir } from '../../interfaces/por_salir.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ingreso',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './ingreso.component.html',
  styleUrl: './ingreso.component.css'
})
export class IngresoComponent  implements OnInit{
  private ingreso_s = inject(IngresoService)
  jornadas
  paralelos
  niveles
  actividades
  cedula
  
  por_salir:Por_salir[]
  usuario:Usuario
ngOnInit(): void {
  
  this.ingreso_s.traer_jornada().subscribe((e)=>{this.jornadas = e})
  this.ingreso_s.traer_paralelo().subscribe((e)=>{this.paralelos = e})
  this.ingreso_s.traer_nivel().subscribe((e)=>{this.niveles = e})
  this.ingreso_s.traer_actividad().subscribe((e)=>{this.actividades = e})
  this.ingreso_s.por_salir().subscribe((e:Por_salir[])=>{this.por_salir =e; console.log(this.por_salir)})
  
}

jornada
paralelo
nivel
actividad
verificar(){
  this.ingreso_s.verificar_cliente(this.cedula).subscribe((e:Usuario[])=>{
    console.log(e)
    this.usuario = e[0]
  })
}
registrar(){
  this.ingreso_s.registrar_ingreso({jornada:this.jornada,paralelo:this.paralelo,nivel:this.nivel,actividad:this.actividad,id_usuario:this.usuario.id_user}).subscribe((e)=>{
    
    window.location.reload()
  })
}
salida(id:string){
  this.ingreso_s.registrar_salida(id).subscribe((e)=>{
    //toaster
    window.location.reload()
  })
}
}
