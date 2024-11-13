import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    //Par autilizar nuestra API rest: https://angular.dev/guide/http/setup
    provideHttpClient(),
    //Para utilizar las animaciones en los componentes angular
    provideAnimationsAsync(),
    //Para la internacionalizacion de fechas formato español: DD/MM/YYYY
    //Y el provideMomentDateAdapter requerido para que el calendario muestre el Lunes
    //como primir dia al configura el locale para "es"
    { provide: MAT_DATE_LOCALE, useValue: 'es' },
    provideMomentDateAdapter() ]
};
