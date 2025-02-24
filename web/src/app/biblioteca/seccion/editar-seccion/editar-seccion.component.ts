import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SeccioneSericeService } from '../seccione-serice.service';
import { ToastrService } from 'ngx-toastr';
import { LoaderComponent } from "../../../componentes/loader/loader.component";

@Component({
  selector: 'app-editar-seccion',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, LoaderComponent],
  templateUrl: './editar-seccion.component.html',
  styleUrl: './editar-seccion.component.css'
})
export class EditarSeccionComponent {
  private route = inject(ActivatedRoute)
  private fb = inject(FormBuilder)
  private toastrService: ToastrService = inject(ToastrService);
  private router = inject(Router)

  buscador = ''
  loadin = false
  libros_sin_asignar:{id_libro:string,codigo:string}[] = []
  libros_asignados:{libros:{id_libro:string,codigo:string}[] , seccion:any} = {libros:[],seccion:[{nombre:"a",fk_estante:""}]}
  seccion!:FormGroup


  libros_agregados:string[] = []  
  libros_eliminados:string[] = []
estados: { [key: string]: string } = {};


private seccion_s = inject(SeccioneSericeService)
id!:string

  ngOnInit(): void {
    this.seccion =  this.fb.group({nombre:[this.libros_asignados.seccion[0].nombre],fk_estante:[this.id]})

    this.route.params.subscribe(params => {
      this.id = params['id'];
      
    });
    this.trear_Libros_sin_asignar(this.buscador)
    this.traer_libros_asignados(this.id)
  }

traer_libros_asignados(id_seccion:string){

    this.seccion_s.traer_libros_asignados(this.id).subscribe((e:any)=>{
this.libros_asignados = e

    })
  }
trear_Libros_sin_asignar(buscador:string){
 
  this.seccion_s.traer_libros_no_a(buscador).subscribe((e:any)=>{
    this.libros_sin_asignar = e
    //console.log(e)
  })
}

cambiarEstado_libros_agregados(id: string) {
  if (this.estados[id] === '-') {
    this.estados[id] = '+';
    let index = this.libros_agregados.indexOf(id);

     this.libros_agregados.splice(index, 1);
     //console.log(this.libros_agregados)

  } else {
    this.estados[id] = '-';
    this.libros_agregados.push(id)
    //console.log(this.libros_agregados)
  }
}
cambiarEstado_libros_elimanados(id: string) {
  if (this.estados[id] === '-') {
    this.estados[id] = '+';
    let index = this.libros_eliminados.indexOf(id);

     this.libros_eliminados.splice(index, 1);
     //console.log(this.libros_eliminados)

  } else {
    this.estados[id] = '-';
    this.libros_eliminados.push(id)
    //console.log(this.libros_eliminados)
    
  }
  
}



editar_secion(){
  this.loadin = true
  this.seccion_s.editar(this.id,this.libros_agregados,this.libros_eliminados,this.seccion.value).subscribe((e:any)=>{
    this.toastrService.success(e.message[0], 'Éxito', {
      timeOut: 3000,
      positionClass: 'toast-top-center',
    });
    
    setTimeout(() => {
      this.router.navigate(['/biblioteca/secciones/'+this.libros_asignados.seccion[0].fk_estante]);

    }, 1000);
    
    
    })

}

}
