import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
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
import { routesAdmin } from './Administrador/app.routesAdmin';
import { routesProfesor } from './Profesor/app.routesProfesor';
import { routesUser } from './usuario/app.routesUser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideRouter(routesAdmin),
    provideRouter(routesProfesor),
    provideRouter(routesUser),
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
