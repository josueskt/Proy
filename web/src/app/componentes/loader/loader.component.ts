import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  template: `
  
  <div
  class="d-flex justify-content-center align-items-center position-fixed top-0 start-0 w-100 h-100 bg-light"
  style="z-index: 1050; opacity: 0.8;"
>
  <div class="spinner-border text-primary" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>
  `,
})
export class LoaderComponent {

}
