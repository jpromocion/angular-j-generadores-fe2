import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom  } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import {TranslateModule, TranslateLoader} from "@ngx-translate/core";
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
  //NOTA: En local funciona bien... pero al desplegar en render y railway, no consigo que los json de i18n esten
  //en subfolder i18n, siempre aparecen en la raiz https://angular-j-generadores-fe-production.up.railway.app/es.json
  //Asi que los hemos puesto directamente en el public raiz para ver si asi funciona desplegado en render/railway...
  //basicamente "si mahoma no va a la montaña... la montaña viene a mahoma"
  new TranslateHttpLoader(http, './i18n/', '.json');
  //new TranslateHttpLoader(http, './', '.json');

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
    provideMomentDateAdapter(),
    //Internacionalizacion de la aplicacion con NGX-Translate
    importProvidersFrom([TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    })])
  ]
};
