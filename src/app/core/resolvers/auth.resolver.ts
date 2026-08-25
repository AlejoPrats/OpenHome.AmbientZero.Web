import { ResolveFn } from '@angular/router';
import { PermissionCacheService } from '../services/permission-cache.service';
import { inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { ProtectionMode } from '../enums/protection-mode';

export const authResolver: ResolveFn<boolean> = (route, state) => {
  const permissions = inject(PermissionCacheService);
  const authService = inject(AuthService);
  const TTL = 20 * 60 * 1000; // 20 minutes

  const protectionMode = permissions.ensureMode();
  if (!protectionMode || Date.now() >= protectionMode!.expiresAt) {
    authService.getProtectionMode().subscribe({
      next: (result) => {
        permissions.setPermissionCache(result as ProtectionMode, Date.now() + TTL);
      }
    })
  }

  return true;
};
