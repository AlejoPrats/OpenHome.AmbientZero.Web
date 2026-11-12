import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
  standalone: true,
})
export class DurationPipe implements PipeTransform {
  transform(totalSeconds: number | null | undefined): string {
    if (totalSeconds == null || isNaN(totalSeconds) || totalSeconds <= 0) {
      return '00s';
    }

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const paddedMinutes = minutes.toString().padStart(2, '0');
    const paddedSeconds = seconds.toString().padStart(2, '0');

    if (totalSeconds < 60) {
      return `${paddedSeconds}s`;
    }

    if (hours === 0) {
      return `${paddedMinutes}m ${paddedSeconds}s`;
    }

    return `${hours}h ${paddedMinutes}m ${paddedSeconds}s`;
  }
}
