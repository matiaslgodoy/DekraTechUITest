import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { UserTableComponent } from '../../components/user-table/user-table.component';
import { ToastNotificationService } from '../../services/toast-notification.service';
import { UserApiService } from '../../services/user-api.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [UserTableComponent],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  private _userService = inject(UserApiService);
  private _toastNotificationService = inject(ToastNotificationService);
  private _translateSerice = inject(TranslateService);
  userList = this._userService.userList || [];

  deleteUserById(userId: number): void {
    this._toastNotificationService.openSnackBar(
      this._translateSerice.instant('TOAST_NOTIFICATION.USER_DELETED'),
    );
    this._userService.deleteUserById(userId);
  }

  openSnackBar() {
    this._toastNotificationService.openSnackBar('mensajedel toas');
  }
}
