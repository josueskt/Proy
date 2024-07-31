import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Libro } from '../../interfaces/libro.interface';
import { PrestamoService } from './prestamo.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-prestamos',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './prestamos.component.html',
  styleUrl: './prestamos.component.css'
})
export class PrestamosComponent {

  private prestamo_S = inject(PrestamoService)
  private fb = inject(FormBuilder)
  private toastrService = inject(ToastrService)
  nuevo_cliente!:FormGroup
  buscador:string=''
  libros:Libro[] =[] 

  cliente:{id_user:string,nombre:string}={id_user:'',nombre:''}
  cliente_valido:boolean = true
  fk_libro_a_prestar = '' 
  cedula = ''
  showModal: boolean =false;

  ngOnInit(): void {
    this.nuevo_cliente =  this.nuevo_cliente = this.fb.group({
      nombre: ['', Validators.required],
      cedula: ['', Validators.required],
      email: ['', Validators.required],
      fk_rol:[5],
      password:['']
      
    });
  }
 
  crear_cliente(){
   
    this.prestamo_S.crear_cliente(this.nuevo_cliente.value).subscribe({
      next:(e:any)=>{
        
       
      this.cedula =  this.nuevo_cliente.value.cedula
        this.validar_Cliente()
        this.toastrService.success(e.message[0], 'Success', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });

        
      },
      error:(e:any)=>{
       
        this.toastrService.error(e.message[0], 'Success', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      },
    })
  }
validar_Cliente(){
 
  this.prestamo_S.verificar_cliente(this.cedula).subscribe({
next:(r:any)=>{
 
 
  if(r && r.length > 0 && r[0].id_user){

    this.cliente = r[0]
    
   

      this.cliente_valido=true
    
  }
  else{
    this.cliente_valido = false
  }
  console.log(r)
},error:(e)=>{
  alert(e)
  console.log(e)
}


  })
}

buscar(){
  if(this.buscador){

    this.prestamo_S.buscador_libros_disponibles(this.buscador).subscribe({
      next:(r:any)=>{ console.log(r)

         this.libros = r
      },error:(e:any)=>{}
    })
  }

}


closeModal(){

  this.showModal = false
}
openModal(fk_libro:string){
  if(fk_libro){
    this.fk_libro_a_prestar = fk_libro
  }
  this.showModal = true
 
}

prestar(){
  console.log(this.cedula+'asdasds'+this.fk_libro_a_prestar)
  if(this.cedula && this.fk_libro_a_prestar){
this.prestamo_S.prestamo({fk_libro:this.fk_libro_a_prestar,
fk_cliente:this.cedula,}).subscribe({
  next:(e:any)=>{
    
    this.toastrService.success(e.message[0], 'Success', {
      timeOut: 3000,
      positionClass: 'toast-top-center',
    });
    
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    
  },error:(e)=>{
    this.toastrService.error(e.message[0], 'Success', {
      timeOut: 3000,
      positionClass: 'toast-top-center',
    });
  
    
  }
})
  }
}


}
