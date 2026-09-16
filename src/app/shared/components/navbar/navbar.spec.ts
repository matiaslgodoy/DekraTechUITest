import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Navbar } from './navbar';

fdescribe('Navbar Component', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Navbar,
        TranslateModule.forRoot(),
        NoopAnimationsModule, // Evita errores con las animaciones de Angular Material Menu
      ],
      providers: [
        provideRouter([]), // Provee el contexto de enrutamiento necesario para RouterLink
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);
    fixture.detectChanges();
  });

  it('should display the current language in the DOM', () => {
    component.changeLanguage('en');
    fixture.detectChanges();

    // Buscar por etiqueta de botón o clase en lugar del atributo directo
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    const langButton = buttons.find((btn) =>
      btn.nativeElement.textContent.includes('en'),
    );

    expect(langButton).toBeTruthy();
  });

  it('should trigger changeLanguage when a menu item is clicked', async () => {
    spyOn(component, 'changeLanguage');

    // 1. Localizar y presionar el botón que dispara el menú desplegable
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    const langTrigger = buttons.find((btn) =>
      btn.nativeElement.textContent.includes(component.currentLang()),
    );

    expect(langTrigger).toBeTruthy();
    langTrigger?.nativeElement.click();
    fixture.detectChanges();

    // 2. Angular Material renderiza el mat-menu en un contenedor global (.cdk-overlay-container)
    const menuItems = document.querySelectorAll<HTMLButtonElement>(
      'button[mat-menu-item]',
    );

    if (menuItems.length > 0) {
      menuItems[1].click(); // Clic en la segunda opción ('en')
      fixture.detectChanges();
      expect(component.changeLanguage).toHaveBeenCalledWith('en');
    }
  });
});
