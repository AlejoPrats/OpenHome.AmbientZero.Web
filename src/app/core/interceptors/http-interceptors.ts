import { HttpInterceptorFn } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';
import { loadingInterceptor } from './loading.interceptor';

export const httpInterceptors: HttpInterceptorFn[] = [authInterceptor, loadingInterceptor];
