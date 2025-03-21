import { ApplicationConfig } from '@angular/core';
import { provideRouter , withHashLocation } from '@angular/router';

import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { AuthGuard } from './roles/auth.guard';
import { AuthInterceptor } from './roles/auth.interceptor';
import { loggerInter } from './roles/logger.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { routesAdmin } from './rutas/app.routesAdmin';
import { routesUser } from './rutas/app.routesUser';
import { routesProfesor } from './rutas/app.routesProfesor';
import { routes } from './rutas/app.routesAll';
import { routesBiblioteca } from './rutas/app.routesBiblioteca';
import { routesPublic } from './rutas/app.public';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes,withHashLocation()),
    provideRouter(routesBiblioteca,withHashLocation()),
    provideRouter(routesAdmin,withHashLocation()),
    provideRouter(routesProfesor,withHashLocation()),
    provideRouter(routesUser,withHashLocation()),
    provideRouter(routesPublic,withHashLocation()),
    
    provideHttpClient(withInterceptors([loggerInter])),
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    provideAnimations(), // required animations providers
    provideToastr(),// Toastr providers
  ],
};
