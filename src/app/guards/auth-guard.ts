import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);

  const user = authService.getUserLS;
  const token = authService.getTokenLS;

  if(!user && !token) return true;

  switch(user!.role){
    case "ADMIN_ROLE":
      router.navigate(["administrador"]);
      break;
    case "USER_ROLE":
      router.navigate(["usuario"]);
      break;
    default:
      authService.resetLS();
      return true;
  }

  return true;
};
