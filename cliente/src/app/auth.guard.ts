import { Injectable, inject } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from './services/usuario.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  return true;
};

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private usuarioService: UsuarioService) {}

  canActivate(): boolean {
    if (this.usuarioService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}