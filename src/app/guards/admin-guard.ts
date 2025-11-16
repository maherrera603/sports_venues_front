import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services';
import { inject } from '@angular/core';


export const adminGuard: CanActivateFn = (route, state) => {

  const authService = inject(Auth);
  const router = inject(Router);

  const user = authService.getUserLS;
  const token = authService.getTokenLS;

  if( (!user && !token) ) {
    router.navigate([""]);
    return false;
  } 

    if(  user!.role !== "ADMIN_ROLE" ) {
    router.navigate([""]);
    return false;
  } 

  return true;

};
