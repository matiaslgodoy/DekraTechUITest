import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { forkJoin, map, Observable } from 'rxjs';
import { routes } from './app.routes';

// Custom Loader que descarga ambos JSONs y los combina
export class CustomMultiTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string): Observable<any> {
    const appTranslations$ = this.http.get(`./assets/i18n/${lang}.json`);
    const libTranslations$ = this.http.get(
      `./assets/i18n/user-management-lib/${lang}.json`,
    );

    return forkJoin([appTranslations$, libTranslations$]).pipe(
      map(([appRes, libRes]) => {
        // Combina el contenido de ambos archivos JSON en un solo objeto
        return { ...appRes, ...libRes };
      }),
    );
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new CustomMultiTranslateLoader(http);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    //Translate
    provideHttpClient(),
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'es',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      }),
    ),
  ],
};
