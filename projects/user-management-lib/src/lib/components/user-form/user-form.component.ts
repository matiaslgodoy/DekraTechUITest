import { Component, effect, inject, input, output } from '@angular/core';
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
  userSaved = output<UserModel>();
  private _fb = inject(FormBuilder);
  private _userService = inject(UserApiService);
  formUtils = FormUtils;

  userForm: FormGroup = this._fb.group({
    username: ['', [Validators.required, this.formUtils.noWhiteSpace]],
    firstname: [
      this.user()?.firstname,
      [Validators.required, this.formUtils.noWhiteSpace],
    ],
    surname: ['', [Validators.required, this.formUtils.noWhiteSpace]],
    email: [
      '',
      [Validators.required, Validators.pattern(FormUtils.emailPattern)],
    ],
    dateOfBirth: ['', [Validators.required, this.formUtils.maxDateToday]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
    active: [false],
  });

  constructor() {
    // 2. El effect se ejecuta cada vez que el Signal 'user' emita un nuevo valor
    effect(() => {
      const userData = this.user();
      if (userData) {
        this.userForm.patchValue({
          ...userData,
          dateOfBirth: userData.dateOfBirth
            ? new Date(userData.dateOfBirth)
            : null,
        });
      }
    });
  }

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
    this.userSaved.emit(currentUser!);
    this.userForm.reset();
  }
}
