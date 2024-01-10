import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LibroTipoService } from './libro-tipo.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-libro-tipo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './libro-tipo.component.html',
  styleUrl: './libro-tipo.component.css',
})
export class LibroTipoComponent {
  private Tipo = inject(LibroTipoService);
  private toastrService: ToastrService = inject(ToastrService);
  nombre = '';
  tipos: any;
  Alertabien = false;

  ngOnInit() {
    this.Tipo.get_tipo().subscribe((carreras) => {
      this.tipos = carreras;
    });
  }

  crear() {
    this.Tipo.crear_tipo(this.nombre).subscribe(
      (data) => {
        this.toastrService.success(data.message, 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.Alertabien = true;
        setTimeout(() => {
          window.location.reload();
          this.Alertabien = false;
        }, 600);
      },err => {
        this.toastrService.error(err.error.message, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }

}
