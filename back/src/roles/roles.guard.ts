// roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly jwtSecretKey = process.env.Key_Key;

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // Si no se especifica ningún rol, permite el acceso
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      this.setForbiddenResponse(context);
      return false; // Si no hay token, deniega el acceso
    }

    try {
      const decodedToken = jwt.verify(token, this.jwtSecretKey) as {
        nombre_rol: string;
      };
      const userRole = decodedToken.nombre_rol;

      if (!requiredRoles.includes(userRole)) {
        this.setForbiddenResponse(context);
        return false; // Si el rol no coincide, deniega el acceso
      }

      return true;
    } catch (error) {
      this.setForbiddenResponse(context);
      return false; // Si hay un error al verificar el token, deniega el acceso
    }
  }

  private setForbiddenResponse(context: ExecutionContext): void {
    const response = context.switchToHttp().getResponse();
    response.status(403).json({
      message: 'Usuario no autorizado',
    });
  }
}
