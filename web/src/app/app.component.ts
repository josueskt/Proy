import { Component, NgModule } from '@angular/core';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { PaginatePipe } from 'ngx-pagination';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavBarComponent ,RouterOutlet, HttpClientModule,],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

  
})

export class AppComponent {
  title = "biblioteca";
}
