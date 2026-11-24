import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdditionalPageInformationService {
  private additionalInformation = signal<string>('');

  getAdditionalInformation(): string {
    return this.additionalInformation();
  }

  clearAdditionalInformation() {
    this.additionalInformation.set('');
  }

  setAdditionalInformation(additionalInformation: string) {
    this.additionalInformation.set(additionalInformation);
  }
}
