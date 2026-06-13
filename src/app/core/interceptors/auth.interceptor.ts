import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { PermissionCacheService } from '../services/permission-cache.service';
import { LoginService } from '../services/login.service';
import { RouteProtectionService } from '../services/route-protection.service';
import { catchError, from, switchMap, throwError } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const permissions = inject(PermissionCacheService);
  const modal = inject(LoginService);
  const routeProtection = inject(RouteProtectionService);
  const authService = inject(AuthService);
  const localStorageService = inject(LocalStorageService);

  const requiredMode = routeProtection.getRequiredMode();

  let modifiedReq = req.clone({
    headers: req.headers.append('X-Protection-Mode', requiredMode?.toString() ?? '0')
  });

  if (authService.isLoggedIn()) {
    modifiedReq = modifiedReq.clone({
      headers: modifiedReq.headers.append('Authorization', `bearer ${localStorageService.getAuthenticationToken()}`)
    });
  }

  return next(modifiedReq).pipe(
    switchMap(() => next(modifiedReq)),
    catchError((err: HttpErrorResponse) => {
      if (err.status !== 401) return throwError(() => err);
      return from(modal.openLoginModal()).pipe(
        switchMap(loggedIn => {
          if (!loggedIn) return throwError(() => err);
          modifiedReq = modifiedReq.clone({
            headers: modifiedReq.headers.append('Authorization', `bearer ${localStorageService.getAuthenticationToken()}`)
          });
          return next(modifiedReq);
        })
      )
    })
  );
};
