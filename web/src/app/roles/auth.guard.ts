// auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    
  ): boolean {
    const token = this.authService.getToken();

    if (!token) {
      // No está autenticado, redirigir al login
      this.router.navigate(['/login']);
      return false;
    }

    const userRole = this.authService.getUserRole();

    if (!userRole) {
      // No tiene ningún rol, redirigir a la página no autorizada
      this.router.navigate(['/user']);
      return false;
    }

    const requiredRoles = (route.data as { roles: string[] }).roles;

    if (requiredRoles && !requiredRoles.includes(userRole)) {
      // No tiene el rol necesario, redirigir a la página no autorizada
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
