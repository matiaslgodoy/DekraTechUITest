import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    TranslateModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
  private translate = inject(TranslateService);

  // Idioma activo expuesto como Signal para la UI
  currentLang = signal<string>('es');

  constructor() {
    // Configuración de idiomas soportados
    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');

    // Mantiene sincronizado el estado inicial
    const activeLang = this.translate.currentLang || 'es';
    this.translate.use(activeLang);
    this.currentLang.set(activeLang);
  }

  changeLanguage(lang: string): void {
    this.translate.use(lang);
    this.currentLang.set(lang);
  }
}
