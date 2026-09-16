import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home-page/home-page.component').then(
        (m) => m.HomePageComponent,
      ),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('user-management-lib').then((m) => m.USER_MANAGEMENT_ROUTES),
  },
  { path: '**', redirectTo: 'home' },
];
