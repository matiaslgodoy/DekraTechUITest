import { Component, inject, input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

// Angular Material Modules
import { MatButton } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltip } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { UserModel } from '../../models/user.model';
import { UserApiService } from '../../services/user-api.service';
import { FormUtils } from '../../shared/utils/form-utils';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    //angular Material
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatButton,
    MatTooltip,
    ReactiveFormsModule,
    TranslateModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserForm {
  user = input<UserModel>();
  private _fb = inject(FormBuilder);
  private _userService = inject(UserApiService);
  formUtils = FormUtils;

  userForm: FormGroup = this._fb.group({
    username: [
      this.user()?.username,
      [Validators.required, this.formUtils.noWhiteSpace],
    ],
    firstname: [
      this.user()?.firstname,
      [Validators.required, this.formUtils.noWhiteSpace],
    ],
    surname: [
      this.user()?.surname,
      [Validators.required, this.formUtils.noWhiteSpace],
    ],
    email: [
      this.user()?.email,
      [Validators.required, Validators.pattern(FormUtils.emailPattern)],
    ],
    dateOfBirth: [
      this.user()?.dateOfBirth,
      [Validators.required, this.formUtils.maxDateToday],
    ],
    password: [this.user()?.password, [Validators.required]],
    confirmPassword: [this.user()?.password, [Validators.required]],
    active: [this.user()?.active ?? false],
  });

  onSave() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    const formValues = this.userForm.value;
    let currentUser = this.user();

    if (currentUser?.id) {
      currentUser = {
        ...currentUser,
        ...formValues,
        id: currentUser.id,
      };
    } else {
      currentUser = formValues;
    }

    this._userService.addUser(currentUser!);

    //this.userForm.reset();
  }
}
