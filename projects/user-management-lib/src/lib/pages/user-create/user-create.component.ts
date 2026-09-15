import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserForm } from '../../components/user-form/user-form.component';
import { UserModel } from '../../models/user.model';
import { ToastNotificationService } from '../../services/toast-notification.service';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [UserForm],
  templateUrl: './user-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCreate {
  private _router = inject(Router);
  private _toastNotificationService = inject(ToastNotificationService);
  private _translateSerice = inject(TranslateService);

  userSaved(userSaved: UserModel): void {
    this._toastNotificationService.openSnackBar(
      this._translateSerice.instant('TOAST_NOTIFICATION.USER_EDITED'),
    );
    this._router.navigate(['users/list']);
  }
}
