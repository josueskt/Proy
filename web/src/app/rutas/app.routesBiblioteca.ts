import { Routes } from "@angular/router";
import { AuthGuard } from "../roles/auth.guard";
import { CargaLibrosBloqueComponent } from "../Administrador/carga-libros-bloque/carga-libros-bloque.component";
import { BibliotecaComponent } from "../biblioteca/biblioteca.component";
import { EstantesComponent } from "../biblioteca/estantes/estantes.component";
import { EditarEstanteComponent } from "../biblioteca/estantes/editar-estante/editar-estante.component";
import { EditarSeccionComponent } from "../biblioteca/seccion/editar-seccion/editar-seccion.component";
import { PrestamosComponent } from "../biblioteca/prestamos/prestamos.component";
import { DevolucionesComponent } from "../biblioteca/devoluciones/devoluciones.component";
import { InventarioComponent } from "../biblioteca/inventario/inventario.component";
import { SeccionesComponent } from "../biblioteca/secciones/secciones.component";
import { HitorialPrestamosComponent } from "../biblioteca/prestamos/hitorial-prestamos/hitorial-prestamos.component";
import { IngresoComponent } from "../biblioteca/ingreso/ingreso.component";
import { InformeingresoComponent } from "../biblioteca/ingreso/informeingreso/informeingreso.component";

export const routesBilbioteca: Routes = [


    {
        path: 'biblioteca',
component :BibliotecaComponent,

        canActivate: [AuthGuard],
        data: { roles: ['BIBLIOTECA'] },

        children: [
            {
                path: '',
                component: BibliotecaComponent,
            },
            {
                path: 'estantes',
                component: EstantesComponent
            }, {
                path: 'estantes/editar/:id',
                component: EditarEstanteComponent
            }, {
                path: 'seccion/:id',
                component: EditarSeccionComponent
            },
             {
                path: 'secciones/:id',
                component: SeccionesComponent
            },
            {
                path: 'secciones/editar/:id',
                component: EditarSeccionComponent
            },
            {
                path: 'prestamos',
                component: PrestamosComponent
            },
            {
                path: 'devolucion',
                component: DevolucionesComponent
            },
            {
                path: 'subir_libros',
                component: CargaLibrosBloqueComponent,
            },
            {
                path: 'inventario',
                component: InventarioComponent,
            },
            {
                path: 'historial/:id',
                component: HitorialPrestamosComponent,
            },

            {
                path: 'ingreso',
                component:IngresoComponent,
            },
            {
                path: 'ingreso/registro',
                component:InformeingresoComponent,
            },
        ]
    },

]
