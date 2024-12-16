import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authInverseGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()){
    const userRole = authService.getUserRole();

    if (userRole === 'ADMIN'){
      router.navigate(['/admin']);
    } else if (userRole === 'USER'){
      router.navigate(['/customer/home']);
    }

    return false;
  }
  return true;
};
