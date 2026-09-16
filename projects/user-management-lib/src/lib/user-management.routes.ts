import { Routes } from '@angular/router';

export const USER_MANAGEMENT_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        loadComponent: () =>
          import('./pages/user-list/user-list.component').then(
            (m) => m.UserListComponent,
          ),
      },
      {
        path: 'create',
        loadComponent: () =>
          import('./pages/user-create/user-create.component').then(
            (m) => m.UserCreateComponent,
          ),
      },
      {
        path: 'edit/:userId',
        loadComponent: () =>
          import('./pages/user-edit/user-edit.component').then(
            (m) => m.UserEditComponent,
          ),
      },
      {
        path: '**',
        redirectTo: 'list',
      },
    ],
  },
];
