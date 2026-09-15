import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: 'users',
    // Importa dinámicamente las rutas desde la librería mapeada
    loadChildren: () =>
      import('user-management-lib').then((m) => m.USER_MANAGEMENT_ROUTES),
  },
];
