import { Type } from "@angular/core";

export interface NabVarItem {
    id: number;
    selectorId:string;
    label: string;
    icon: string;
    hint?: string;
    enabled: boolean;
}
