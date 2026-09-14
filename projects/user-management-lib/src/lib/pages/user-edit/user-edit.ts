import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [],
  templateUrl: './user-edit.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserEdit {}
