import { TestBed } from '@angular/core/testing';
import {
  HttpClient,
  HttpErrorResponse,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { vi } from 'vitest';

import { httpInterceptors } from './http-interceptors';
import { LoadingService } from '../services/loading.service';
import { LoginService } from '../services/login.service';

describe('httpInterceptors', () => {
  const url = '/api/Sensor/GetSensors';
  let http: HttpClient;
  let httpTesting: HttpTestingController;
  let loadingService: LoadingService;
  let resolveLogin: (loggedIn: boolean) => void;
  let openLoginModal: ReturnType<typeof vi.fn>;

  const expireSession = async () => {
    httpTesting.expectOne(url).flush(null, { status: 401, statusText: 'Unauthorized' });
    await Promise.resolve();
  };

  beforeEach(() => {
    localStorage.clear();
    openLoginModal = vi.fn(
      () =>
        new Promise<boolean>((resolve) => {
          resolveLogin = resolve;
        }),
    );

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors(httpInterceptors)),
        provideHttpClientTesting(),
        { provide: LoginService, useValue: { openLoginModal } },
      ],
    });

    http = TestBed.inject(HttpClient);
    httpTesting = TestBed.inject(HttpTestingController);
    loadingService = TestBed.inject(LoadingService);
  });

  afterEach(() => {
    httpTesting.verify();
    localStorage.clear();
  });

  it('should show the loading indicator while a request is in progress', () => {
    http.get(url).subscribe();

    expect(loadingService.loading()).toBe(true);

    httpTesting.expectOne(url).flush([]);

    expect(loadingService.loading()).toBe(false);
  });

  it('should hide the loading indicator so the login dialog can be used when the session expires', async () => {
    http.get(url).subscribe();

    await expireSession();

    expect(openLoginModal).toHaveBeenCalledTimes(1);
    expect(loadingService.loading()).toBe(false);
  });

  it('should retry the request with loading shown after logging in again', async () => {
    const response = vi.fn();
    http.get(url).subscribe(response);
    await expireSession();

    resolveLogin(true);
    await Promise.resolve();
    await Promise.resolve();

    expect(loadingService.loading()).toBe(true);

    httpTesting.expectOne(url).flush(['sensor']);

    expect(response).toHaveBeenCalledWith(['sensor']);
    expect(loadingService.loading()).toBe(false);
  });

  it('should fail the request without loading when the login is cancelled', async () => {
    const error = vi.fn();
    http.get(url).subscribe({ error });
    await expireSession();

    resolveLogin(false);
    await Promise.resolve();
    await Promise.resolve();

    expect(error).toHaveBeenCalledWith(expect.any(HttpErrorResponse));
    expect(loadingService.loading()).toBe(false);
  });
});
