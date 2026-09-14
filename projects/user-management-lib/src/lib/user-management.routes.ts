import { Routes } from '@angular/router';
import { UserCreate } from './pages/user-create/user-create';
import { UserEdit } from './pages/user-edit/user-edit';
import { UserList } from './pages/user-list/user-list';

export const USER_MANAGEMENT_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: UserList,
      },
      {
        // path: 'create',
        path: 'create',
        component: UserCreate,
      },
      {
        path: ':id/edit',
        component: UserEdit,
      },
      {
        path: '**',
        redirectTo: 'create',
      },
    ],
  },
];
