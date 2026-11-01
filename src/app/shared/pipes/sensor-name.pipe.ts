import { Pipe, PipeTransform } from '@angular/core';

export const sensorName = (name: string | null | undefined, fallback: string): string =>
  name?.trim() || fallback;

@Pipe({
  name: 'sensorName',
})
export class SensorNamePipe implements PipeTransform {
  transform(name: string | null | undefined, fallback: string): string {
    return sensorName(name, fallback);
  }
}
