import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { UserTableComponent } from '../../components/user-table.component/user-table.component';
import { UserModel } from '../../models/user.model';
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
  userList: UserModel[] = this._userService.userList() || [];

  deleteUserById(userId: number): void {
    // Filtra el usuario del array/Signal
    //this.userList()!.update(this.userList() => this.userList()!.filter(user => user.id !== id));
    console.log('ELIMINAR ANTES ', this.userList);
    this._userService.deleteUserById(userId);
    console.log('ELIMINAR DESPUES', this.userList);
  }
}
