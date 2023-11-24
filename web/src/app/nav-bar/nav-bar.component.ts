import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  @Input() username: string = '';
  isMenuOpen: boolean;

  constructor() {
    this.username = ""; // Assign the value of the username
    this.isMenuOpen = true; // Initially, the menu is closed
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    // Perform corresponding actions when the menu is opened or closed
    // For example, show/hide a dropdown menu, change the state of the button, etc.
  }

}
