import {
  ApplicationConfig,
  PLATFORM_ID,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors';
import { LOCAL_STORAGE } from './tokens';
import { isPlatformServer } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: LOCAL_STORAGE,
      useFactory: (platformId: object) => {
        if (isPlatformServer(platformId)) {
          return {};
        }
        return localStorage;
      },
      deps: [PLATFORM_ID],
    },
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};
