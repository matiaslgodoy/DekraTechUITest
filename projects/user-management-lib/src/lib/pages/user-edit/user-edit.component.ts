import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { UserForm } from '../../components/user-form/user-form.component';
import { UserApiService } from '../../services/user-api.service';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [UserForm, JsonPipe],
  templateUrl: './user-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserEdit {
  private _userService = inject(UserApiService);

  userId = toSignal(
    inject(ActivatedRoute).params.pipe(map((params) => params['userId'])),
  );

  userToEdit = computed(() => this._userService.getUserById(this.userId()));
}
