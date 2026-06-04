import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { PermissionCacheService } from '../services/permission-cache.service';
import { AuthService } from '../../shared/services/auth.service';
import { LoginService } from '../services/login.service';
import { ProtectionMode } from '../enums/protection-mode';
import { RouteProtectionService } from '../../shared/services/route-protection.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const permissionsCache = inject(PermissionCacheService);
  const auth = inject(AuthService);
  const modal = inject(LoginService);
  const routeProtection = inject(RouteProtectionService);

  let current = route;
  while (current.firstChild) {
    current = current.firstChild;
  }

  const requiredMode = current.data['protectionLevel'] as ProtectionMode ?? null;

  if (auth.isLoggedIn()) {
    return true;
  }

  if (requiredMode! == ProtectionMode.Allways) {
    return modal.openLoginModal();
  }

  if (requiredMode! == ProtectionMode.Open) {
    return true;
  }

  const userMode = permissionsCache.getPermissionCache();
  routeProtection.setRequiredMode(requiredMode ?? null);

  if (userMode.protectionMode < requiredMode) {
    return true;
  }

  return modal.openLoginModal();
};
