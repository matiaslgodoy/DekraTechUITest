import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-user-delete-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatDialogContent,
    MatDialogActions,
    TranslateModule,
  ],
  templateUrl: './user-delete-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDeleteDialogComponent {
  private dialogRef = inject(MatDialogRef<UserDeleteDialogComponent>);

  onConfirm(): void {
    this.dialogRef.close(true); // Retorna true al padre
  }

  onCancel(): void {
    this.dialogRef.close(false); // Retorna false al padre
  }
}
