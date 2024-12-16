import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { UserProfileService } from '../services/user-profile.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export const profileGuard: CanActivateFn = (route, state): Observable<boolean | UrlTree> => {
  const profileService = inject(UserProfileService);
  const router = inject(Router);

  return profileService.existsProfile().pipe(
    map(exists => {
      if (exists) {
        return router.parseUrl('/customer/home');
      }
      return true;
    }),
    catchError(() => {
      return of(true);
    })
  );
};

