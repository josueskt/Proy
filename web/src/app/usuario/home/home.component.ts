import { Component, OnInit, inject } from '@angular/core';
import {  Router } from '@angular/router';
import { HomeService } from './home.service';
import { AuthService } from 'src/app/roles/auth.service';
import { DataService } from '../data.service';
import { FormsModule } from '@angular/forms';

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
    }, 100); // 1000 milisegundos = 1 segundo
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
