import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { LOCAL_STORAGE } from './tokens';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    {
      provide: LOCAL_STORAGE,
      useFactory: () => ({
        getItem: () => {return null;},
        setItem: () => {},
        removeItem: () => {},
      }),
    },
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
