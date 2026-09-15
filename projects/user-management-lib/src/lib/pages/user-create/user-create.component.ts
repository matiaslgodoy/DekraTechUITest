import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserForm } from '../../components/user-form/user-form.component';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [UserForm],
  templateUrl: './user-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCreate {
  private _router = inject(Router);

  userSaved(userSaved: UserModel): void {
    console.log('USUARIO', this.userSaved);
    this._router.navigate(['users/list']);
  }
}
