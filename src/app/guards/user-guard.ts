import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services';

export const userGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);

  const user = authService.getUserLS;
  const token = authService.getTokenLS;

  if( !user && !token ) {
    router.navigate([""]);
    return false;
  } 

  if( user!.role !== "USER_ROLE" ) {
    router.navigate([""]);
    return false;
  } 

  return true;
};
