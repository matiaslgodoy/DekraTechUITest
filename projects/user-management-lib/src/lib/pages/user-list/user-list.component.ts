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

  // displayedColumns: string[] = [
  //   'username',
  //   'name',
  //   'age',
  //   'dateCreated',
  //   'dateLastLoggin',
  //   'active',
  //   'options',
  // ];
  // dataSource = new MatTableDataSource(this.userList);
  // constructor(private _liveAnnouncer: LiveAnnouncer) {}
  // @ViewChild(MatSort) sort!: MatSort;
  // ngAfterViewInit() {
  //   this.dataSource.sort = this.sort;
  // }
  // announceSortChange(sortState: Sort) {
  //   if (sortState.direction) {
  //     this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  //   } else {
  //     this._liveAnnouncer.announce('Sorting cleared');
  //   }
  // }
}
