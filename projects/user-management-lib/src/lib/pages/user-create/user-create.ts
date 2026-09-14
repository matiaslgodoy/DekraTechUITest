import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserForm } from '../../components/user-form/user-form';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [UserForm],
  templateUrl: './user-create.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCreate {}
