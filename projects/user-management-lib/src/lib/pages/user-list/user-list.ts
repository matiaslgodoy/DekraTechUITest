import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [],
  templateUrl: './user-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserList {}
