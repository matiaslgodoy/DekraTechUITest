import { Routes } from '@angular/router';
import { UserCreateComponent } from './pages/user-create/user-create.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { UserListComponent } from './pages/user-list/user-list.component';

export const USER_MANAGEMENT_ROUTES: Routes = [
  {
    path: '',
    children: [
      // {
      //   path: 'home',
      //   component: HomePageComponent,
      // },
      {
        path: 'list',
        component: UserListComponent,
      },
      {
        path: 'create',
        component: UserCreateComponent,
      },
      {
        path: 'edit/:userId',
        component: UserEditComponent,
      },
      {
        path: '**',
        redirectTo: 'list',
      },
    ],
  },
];
