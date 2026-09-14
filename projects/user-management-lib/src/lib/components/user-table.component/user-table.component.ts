import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DatePipe } from '@angular/common';
import { Component, effect, input, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserModel } from '../../models/user.model';
import { AgePipePipe } from '../../shared/pipes/age.pipe-pipe';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    DatePipe,
    AgePipePipe,
    MatIconModule,
  ],
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTableComponent {
  userList = input<UserModel[]>();

  displayedColumns: string[] = [
    'username',
    'name',
    'age',
    'dateCreated',
    'dateLastLoggin',
    'active',
    'options',
  ];
  dataSource = new MatTableDataSource<UserModel>();

  constructor(private _liveAnnouncer: LiveAnnouncer) {
    effect(() => {
      this.dataSource.data = this.userList() || [];
    });
  }

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    //this.dataSource = new MatTableDataSource(this.userList());
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
