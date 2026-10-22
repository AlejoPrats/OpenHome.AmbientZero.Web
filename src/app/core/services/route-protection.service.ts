import { Injectable } from '@angular/core';
import { ProtectionMode } from '../enums/protection-mode';

@Injectable({ providedIn: 'root' })
export class RouteProtectionService {
  private current: ProtectionMode | null = null;

  setRequiredMode(mode: ProtectionMode | null): void {
    this.current = mode;
  }

  getRequiredMode(): ProtectionMode | null {
    return this.current;
  }
}
