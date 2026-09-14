import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  {
    path: 'users',
    // Importa dinámicamente las rutas desde la librería mapeada
    loadChildren: () =>
      import('user-management-lib').then((m) => m.USER_MANAGEMENT_ROUTES),
  },
];
