import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CdkAutofill } from '@angular/cdk/text-field';
import { DatePipe } from '@angular/common';
import { Component, effect, input, output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { UserModel } from '../../models/user.model';
import { AgePipePipe } from '../../shared/pipes/age.pipe-pipe';
import { UserDeleteDialogComponent } from '../user-delete-dialog/user-delete-dialog.component';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    DatePipe,
    AgePipePipe,
    MatIconModule,
    TranslateModule,
    CdkAutofill,
    RouterLink,
  ],
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTableComponent {
  userList = input<UserModel[]>();
  deleteUserById = output<number>();

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

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog,
  ) {
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

  openDialog(userId: number): void {
    //this.dialog.open(UserDeleteDialogComponent);
    const dialogRef = this.dialog.open(UserDeleteDialogComponent, {
      width: '400px',
    });

    // Escucha cuando el modal se cierra
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        // El usuario presionó "Eliminar"
        // this.deleteUser(userId);
        this.deleteUserById.emit(userId);
      }
    });
  }

  // private deleteUser(id: number): void {
  //   // Filtra el usuario del array/Signal
  //   //this.userList()!.update(this.userList() => this.userList()!.filter(user => user.id !== id));
  //   console.log('ELIMINAR!!');
  // }
}
