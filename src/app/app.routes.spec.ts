import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Route, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from './app.routes';

@Component({ template: '' })
class StubPageComponent {}

const toStubRoute = ({ path, children, redirectTo }: Route): Route =>
  redirectTo !== undefined
    ? { path, redirectTo }
    : { path, component: StubPageComponent, children: children?.map(toStubRoute) };

describe('routes', () => {
  let harness: RouterTestingHarness;
  let router: Router;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes.map(toStubRoute))],
    });

    harness = await RouterTestingHarness.create();
    router = TestBed.inject(Router);
  });

  it.each`
    requestedUrl              | expectedUrl
    ${'/does-not-exist'}      | ${'/'}
    ${'/list/does-not-exist'} | ${'/'}
    ${'/list'}                | ${'/list'}
    ${'/sensorDetail/42'}     | ${'/sensorDetail/42'}
  `(
    'should end at $expectedUrl when opening $requestedUrl',
    async ({ requestedUrl, expectedUrl }) => {
      await harness.navigateByUrl(requestedUrl);

      expect(router.url).toBe(expectedUrl);
    },
  );
});
