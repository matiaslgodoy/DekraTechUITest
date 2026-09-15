import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { UserForm } from '../../components/user-form/user-form.component';
import { UserModel } from '../../models/user.model';
import { UserApiService } from '../../services/user-api.service';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [UserForm],
  templateUrl: './user-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserEdit {
  private _userService = inject(UserApiService);
  private _router = inject(Router);

  userId = toSignal(
    inject(ActivatedRoute).params.pipe(map((params) => params['userId'])),
  );

  userToEdit = computed(() => this._userService.getUserById(this.userId()));

  userSaved(userSaved: UserModel): void {
    console.log('USUARIO', this.userSaved);
    this._router.navigate(['users/list']);
  }
}
