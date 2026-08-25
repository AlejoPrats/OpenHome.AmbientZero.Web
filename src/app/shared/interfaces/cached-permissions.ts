import { ProtectionMode } from "../../core/enums/protection-mode";

export interface CachedPermissions {
    protectionMode: ProtectionMode;
    expiresAt: number;
}