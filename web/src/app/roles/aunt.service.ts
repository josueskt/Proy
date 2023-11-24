// auth.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserInfo(): any | null {
    const token = this.getToken();
    if (token) {
      // Decodificar el token para obtener la información del usuario
      const userInfo = JSON.parse(atob(token.split('.')[1]));
      return userInfo;
    }
    return null;
  }

  clearToken(): void {
    localStorage.removeItem('token');
  }

}
