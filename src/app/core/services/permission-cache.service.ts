import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProtectionMode } from '../enums/protection-mode';
import { CachedPermissions } from '../../shared/interfaces/cached-permissions'

@Injectable({ providedIn: 'root' })
export class PermissionCacheService {
  private readonly KEY = 'permission_mode';
  private inMemory: CachedPermissions | null = null;

  getPermissionCache(): CachedPermissions {
    const cached = this.load();

    return cached;
  }

  setPermissionCache(protectionMode: ProtectionMode, date:number) {
    const data: CachedPermissions = {
      protectionMode,
      expiresAt: date
    };

    this.inMemory = data;
    localStorage.setItem(this.KEY, JSON.stringify(data));
  }

  ensureMode(): CachedPermissions | null {
    const cached = this.getPermissionCache();

    if (cached) {
      return cached;
    }
    else {
      return null;
    }
  }

  private load(): CachedPermissions {
    if (this.inMemory) {
      return this.inMemory;
    }

    const raw = localStorage.getItem(this.KEY);

    const parsed = JSON.parse(raw!) as CachedPermissions;
    this.inMemory = parsed;
    return parsed;
  }
}
