import { Component } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-administrador',
    standalone: true,
    templateUrl: './administrador.component.html',
    imports: [NavBarComponent, RouterOutlet]
})
export class AdministradorComponent {

}
