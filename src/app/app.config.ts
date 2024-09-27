import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideState, provideStore} from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import {moviesReducer} from "./store/movies.reducers";
import {HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi} from "@angular/common/http";
import {MoviesEffects} from "./store/movies.effects";
import {authInterceptor} from "./interceptor/auth.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
      provideRouter(routes),
      provideHttpClient(withFetch(), withInterceptorsFromDi()),
      {provide: HTTP_INTERCEPTORS, useClass: authInterceptor, multi: true},
      provideStore(),
      provideState({name: 'movies', reducer: moviesReducer}),
      provideEffects(MoviesEffects),
      provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
  ]
};
