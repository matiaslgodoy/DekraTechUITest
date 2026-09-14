import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [],
  templateUrl: './user-create.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCreate {}
