import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from './home.service';
import { AuthService } from 'src/app/roles/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userInfo: any;
  carreras: any[] = [];
  searchText: string='';
  selectedCarrera: any;

  constructor(
    private authService: AuthService, 
    private homeService: HomeService,
    private router: Router, 
    private route: ActivatedRoute 
    ) {}

  ngOnInit() {
    this.userInfo = this.authService.getUserInfo();
    const nombre = this.userInfo.nombre;

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
        
        this.router.navigate(['/libros'], { queryParams: { cadena: this.searchText, resultados: JSON.stringify(resultados) } });
      },
      (error) => {
        console.error('Error al buscar libros:', error);
      }
    );
}
}
