import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
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
import { TranslateModule } from '@ngx-translate/core';
import { UserModel } from '../../models/user.model';
import { FormUtils } from '../../shared/utils/form-utils';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatButton,
    ReactiveFormsModule,
    TranslateModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent {
  user = input<UserModel>();
  userSaved = output<UserModel>();
  private _fb = inject(FormBuilder);

  formUtils = FormUtils;

  userForm: FormGroup = this._fb.group(
    {
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          this.formUtils.noWhiteSpace,
        ],
      ],
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
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      active: [false],
    },
    {
      validators: [
        this.formUtils.isFieldOneEqualsFieldTwo('password', 'confirmPassword'),
      ],
    },
  );

  constructor() {
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
    this.userSaved.emit(currentUser!);
  }
}
