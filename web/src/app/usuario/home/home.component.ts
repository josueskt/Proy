import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { HomeService } from './home.service';
import { AuthService } from 'src/app/roles/auth.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  showBuscador = false; // Inicialmente oculto

  ngAfterViewInit() {
    // Simulación de un retraso (puedes ajustar esto según tus necesidades)
    setTimeout(() => {
      this.showBuscador = true; // Mostrar el buscador después de un cierto tiempo
    }, 100); // 1000 milisegundos = 1 segundo
  }
  
  userInfo: any;
  carreras: any[] = [];
  searchText='';
  selectedCarrera = "Carrera";

  constructor(
    private authService: AuthService, 
    private homeService: HomeService,
    private router: Router, 
    
    private dataService: DataService
    ) {}

  ngOnInit() {
    this.userInfo = this.authService.getUserInfo();
    

    this.homeService.getCarreras().subscribe(
      (carreras) => {
        this.carreras = carreras;
        
      },
      (error) => {
        console.error('Error al obtener las carreras:', error);
      }
    );
   
  }
  
  buscarLibros() {
    console.log(this.selectedCarrera)
    this.homeService.buscarLibros(this.searchText, this.selectedCarrera).subscribe(
      (resultados) => {
        
       
        
        this.dataService.setResultados(resultados);
        this.router.navigate(['/libro'])
      },
      (error) => {
        console.error('Error al buscar libros:', error);
      }
    );
    
}
}
