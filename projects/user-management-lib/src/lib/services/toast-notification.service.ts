import { inject, Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToastNotificationService {
  durationInSeconds = 3;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  private _snackBar = inject(MatSnackBar);

  openSnackBar(notificationMsj: string) {
    this._snackBar.open(notificationMsj, 'x', {
      duration: this.durationInSeconds * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
