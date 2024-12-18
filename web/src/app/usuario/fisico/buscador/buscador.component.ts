import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Carrera } from '../../../interfaces/Carrera.interface';
import { Usuario } from '../../../interfaces/usuario.interface';
import { AuthService } from '../../../roles/auth.service';
import { HomeService } from '../../home/home.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buscador-fisico',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.css'
})
export default class BuscadorComponentFisico {
  showBuscador = false; 
  ngAfterViewInit() {
    setTimeout(() => {
      this.showBuscador = true; 
    }, 10); 
  }

  userInfo:Usuario
  carreras: Carrera[] = [];
  searchText='';
  selectedCarrera = "";

    private authService=inject( AuthService)
    private homeService=inject(  HomeService)
    private router=inject(  Router)
    private toastrService: ToastrService = inject(ToastrService);


  ngOnInit() {
    this.homeService.getCarreras().subscribe({
     next: (carreras) => {
        this.carreras = carreras;

      },
     error: () => {
        this.toastrService.error('Error al obtener las carreras:', 'Fail', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      }
     } );

  }

  buscarLibros() {
    this.router.navigate(['/user/fisico/libro'], { queryParams: { texto: this.searchText , carrera:this.selectedCarrera ,tipo:3 } });
    
    

}
}
