import { Routes } from '@angular/router';
import { UsuarioComponent } from '../usuario/usuario.component';
import { VistalibroComponent } from '../usuario/vistalibro/vistalibro.component';
import { VistalibroComponentFisico } from '../usuario/fisico/vistalibro/vistalibro.component';

export const routesPublic: Routes = [
  {
    path: 'user',
    component: UsuarioComponent,
    children: [
      {
        path: 'fisico',
        loadComponent: () =>
          import('../usuario/fisico/buscador/buscador.component').then(
            (m) => m.default
          ),

          
      },
      {
        path: 'fisico/libro',
        loadComponent: () =>
          import('../usuario/fisico/libro/libro.component').then((m) => m.LibroComponentFisico),
      },
      {
        path: 'fisico/libro/:id',
        component: VistalibroComponentFisico,
      },
     
    
    
    ],
  },
];
