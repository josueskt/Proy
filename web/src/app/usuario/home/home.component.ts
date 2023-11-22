import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/roles/aunt.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userInfo: any;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Obtener la información del usuario al inicializar el componente
    this.userInfo = this.authService.getUserInfo();
    const nombre = this.userInfo.nombre
  }
}
