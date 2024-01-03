import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
export declare class RolesGuard implements CanActivate {
    private reflector;
    private readonly jwtSecretKey;
    constructor(reflector: Reflector);
    canActivate(context: ExecutionContext): boolean;
    private setForbiddenResponse;
}
