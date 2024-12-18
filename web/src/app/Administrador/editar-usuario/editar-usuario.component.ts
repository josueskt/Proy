import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditarUsuarioService } from './editar-usuario.service';
import { FormsModule, NgModel } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.css'
})
export class EditarUsuarioComponent {

  userId: string; 
usuario:{"id_user":string,"email":string,"fk_rol":number,"nombre":string}

private route = inject( ActivatedRoute)
private router= inject( Router)
  private user = inject(EditarUsuarioService)
  private toastrService: ToastrService = inject(ToastrService);
 

  async ngOnInit(): Promise<void> {
    
    this.userId = this.route.snapshot.paramMap.get('id');



   this.user.get_user_by_Id(this.userId).subscribe({
      next:(e)=>{
        //console.log(e)
        this.usuario = e[0]
      }
    })
    

  }

  onSubmit() {
    // Lógica a ejecutar cuando se envía el formulario
    
    this.user.editarusuario(this.usuario).subscribe(
    {
      next: (response:{message:string}) => {
        
        this.toastrService.success(response.message, 'OK', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this.router.navigate(['./admin/Registrar_usuarios']);
      },
      error:(e)=>{
        throw(e)
      }
    }
    )
  }

}
