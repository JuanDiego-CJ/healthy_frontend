import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { UserProfileService } from '../services/user-profile.service';
import { catchError, map, Observable, of } from 'rxjs';

export const profileReverseGuard: CanActivateFn = (route, state): Observable<boolean | UrlTree> => {
  const profileService = inject(UserProfileService);
  const router = inject(Router);

  return profileService.existsProfile().pipe(
    map(exists => {
      if (exists) {
        return true;
      } else {
        return router.parseUrl('/customer/create-profile');
      }
    }),
    catchError(() => {
      return of(router.parseUrl('/customer/create-profile'));
    })
  );
};
