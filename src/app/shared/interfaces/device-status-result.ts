export interface DeviceStatusResult {
  memory: MemoryInformation;
  swap: SwapInformation;
  cpu: CpuInformation;
}

export interface MemoryInformation {
  available: string;
  free: string;
}

export interface SwapInformation {
  used: string;
}

export interface CpuInformation {
  temperature: number;
}
