import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CarreraService } from '../carrera.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-carrea',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './editar-carrea.component.html',
  styleUrl: './editar-carrea.component.css'
})
export class EditarCarreaComponent  implements OnInit{

private carrera_S= inject(CarreraService)
private route = inject( ActivatedRoute)
private toastrService: ToastrService = inject(ToastrService);

nombre = ''
id!:string
ngOnInit(): void {
  this.id = this.route.snapshot.paramMap.get('id');

this.carrera_S.traerPorId(parseInt(this.id)).subscribe((e)=>{console.log(e)
  this.nombre = e[0].nombre
})

}

editar(){
  this.carrera_S.editarCarrera(this.id,{nombre:this.nombre}).subscribe((e)=>{console.log(e)


    this.toastrService.success(e.message[0], 'OK', {
      timeOut: 3000, positionClass: 'toast-top-center'
    });

  })
}

}
