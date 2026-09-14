import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserForm } from '../../components/user-form/user-form.component';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [UserForm],
  templateUrl: './user-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCreate {}
