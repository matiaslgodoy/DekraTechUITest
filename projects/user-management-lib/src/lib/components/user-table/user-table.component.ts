import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  OnInit,
  output,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
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
    RouterLink,
  ],
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTableComponent implements OnInit {
  userList = input<UserModel[]>();
  deleteUserById = output<number>();
  @ViewChild(MatSort) sort!: MatSort;

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

  constructor(public dialog: MatDialog) {
    effect(() => {
      this.dataSource.data = this.userList() || [];
    });
  }

  ngOnInit(): void {
    // Definimos el extractor de datos personalizado para el ordenamiento
    this.dataSource.sortingDataAccessor = (
      item: UserModel,
      property: string,
    ) => {
      switch (property) {
        case 'name':
          // Concatenamos nombre y apellido para ordenar por el texto completo
          return `${item.firstname} ${item.surname}`.toLowerCase();
        default:
          // Para las demás columnas, lee la propiedad directo
          return (item as any)[property];
      }
    };
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  openDialog(userId: number): void {
    const dialogRef = this.dialog.open(UserDeleteDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.deleteUserById.emit(userId);
      }
    });
  }

  getFullName(user: UserModel): string {
    return `${user.firstname} ${user.surname}`;
  }
}
