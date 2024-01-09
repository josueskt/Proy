import { Component, OnInit, inject } from '@angular/core';
import {  Router } from '@angular/router';
import { HomeService } from './home.service';

import { DataService } from '../data.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../roles/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  showBuscador = false; // Inicialmente oculto

  ngAfterViewInit() {
    // Simulación de un retraso (puedes ajustar esto según tus necesidades)
    setTimeout(() => {
      this.showBuscador = true; // Mostrar el buscador después de un cierto tiempo
    }, 10); // 1000 milisegundos = 1 segundo
  }

  userInfo: any;
  carreras: any[] = [];
  searchText='';
  selectedCarrera = "Carrera";


    private authService=inject( AuthService)
    private homeService=inject(  HomeService)
    private router=inject(  Router)

    private dataService=inject(  DataService)


  ngOnInit() {
    this.userInfo = this.authService.getUserInfo();


    this.homeService.getCarreras().subscribe({
     next: (carreras) => {
        this.carreras = carreras;

      },
      error :(error) => {
        console.error('Error al obtener las carreras:', error);
      }
     } );

  }

  buscarLibros() {
    console.log(this.selectedCarrera)
    this.homeService.buscarLibros(this.searchText, this.selectedCarrera).subscribe({
     next: (resultados) => {



        this.dataService.setResultados(resultados);
        this.router.navigate(['/user/libro'])
      },
     error: (error) => {
        console.error('Error al buscar libros:', error);
      }
      }  );

}
}
