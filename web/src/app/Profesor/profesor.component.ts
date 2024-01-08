import { Component } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-profesor',
    standalone: true,
    templateUrl: './profesor.component.html',
    styleUrl: './profesor.component.css',
    imports: [NavBarComponent, RouterOutlet]
})
export class ProfesorComponent {

}
