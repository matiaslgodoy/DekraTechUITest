import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewChild,
} from '@angular/core';

import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserModel } from '../../models/user.model';
import { UserApiService } from '../../services/user-api.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [MatTableModule, MatSortModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserList {
  private _userService = inject(UserApiService);
  userList: UserModel[] = this._userService.userList() || [];
  displayedColumns: string[] = [
    'username',
    'name',
    'age',
    'dateCreated',
    'dateLastLoggin',
    'active',
  ];
  dataSource = new MatTableDataSource(this.userList);

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
