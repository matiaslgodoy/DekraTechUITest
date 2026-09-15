import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs';
import { UserFormComponent } from '../../components/user-form/user-form.component';
import { UserModel } from '../../models/user.model';
import { ToastNotificationService } from '../../services/toast-notification.service';
import { UserApiService } from '../../services/user-api.service';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [UserFormComponent, TranslateModule],
  templateUrl: './user-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserEditComponent {
  private _userService = inject(UserApiService);
  private _router = inject(Router);
  private _toastNotificationService = inject(ToastNotificationService);
  private _translateSerice = inject(TranslateService);

  userId = toSignal(
    inject(ActivatedRoute).params.pipe(map((params) => params['userId'])),
  );

  userToEdit = computed(() => this._userService.getUserById(this.userId()));

  userSaved(userSaved: UserModel): void {
    this._userService.addUser(userSaved!);
    this._toastNotificationService.openSnackBar(
      this._translateSerice.instant('TOAST_NOTIFICATION.USER_EDITED'),
    );
    this._router.navigate(['users/list']);
  }
}
