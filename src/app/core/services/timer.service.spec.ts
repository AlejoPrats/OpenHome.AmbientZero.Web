import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { TimerService } from './timer.service';

describe('TimerService', () => {
  let service: TimerService;

  beforeEach(() => {
    vi.useFakeTimers();
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimerService);
  });

  afterEach(() => {
    vi.useRealTimers();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('finished', () => {
    it('should not notify before the timer runs out', () => {
      const onFinished = vi.fn();
      service.setTimer('reboot', 1_000);

      service.finished('reboot').subscribe(onFinished);
      vi.advanceTimersByTime(750);

      expect(onFinished).not.toHaveBeenCalled();
    });

    it('should notify once when the timer runs out', () => {
      const onFinished = vi.fn();
      service.setTimer('reboot', 1_000);

      service.finished('reboot').subscribe(onFinished);
      vi.advanceTimersByTime(5_000);

      expect(onFinished).toHaveBeenCalledTimes(1);
    });

    it('should stop checking the timer after unsubscribing', () => {
      const onFinished = vi.fn();
      service.setTimer('reboot', 1_000);
      const subscription = service.finished('reboot').subscribe(onFinished);

      subscription.unsubscribe();
      vi.advanceTimersByTime(5_000);

      expect(onFinished).not.toHaveBeenCalled();
    });
  });
});
