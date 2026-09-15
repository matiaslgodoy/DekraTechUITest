import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { UserTableComponent } from '../../components/user-table.component/user-table.component';
import { UserApiService } from '../../services/user-api.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [UserTableComponent],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserList {
  private _userService = inject(UserApiService);
  userList = this._userService.userList || [];

  deleteUserById(userId: number): void {
    this._userService.deleteUserById(userId);
  }
}
