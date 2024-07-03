import { Component, OnInit, inject ,AfterViewInit} from '@angular/core';
import {  Router } from '@angular/router';
import { HomeService } from './home.service';

import { FormsModule } from '@angular/forms';
import { AuthService } from '../../roles/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Carrera } from '../../interfaces/Carrera.interface';
import { Usuario } from '../../interfaces/usuario.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit ,AfterViewInit {

  showBuscador = false; 
  ngAfterViewInit() {
    setTimeout(() => {
      this.showBuscador = true; 
    }, 10); 
  }

  userInfo:Usuario
  carreras: Carrera[] = [];
  searchText='';
  selectedCarrera = "Carrera";

    private authService=inject( AuthService)
    private homeService=inject(  HomeService)
    private router=inject(  Router)
    private toastrService: ToastrService = inject(ToastrService);


  ngOnInit() {
    this.userInfo = this.authService.getUserInfo();


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
    console.log(this.selectedCarrera)
    this.router.navigate(['/user/libro'], { queryParams: { texto: this.searchText , carrera:this.selectedCarrera } });
    
    

}
}
