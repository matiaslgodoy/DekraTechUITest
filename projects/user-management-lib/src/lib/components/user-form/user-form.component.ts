import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
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
import { FormUtils } from '../../utils/form-utils';

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
    JsonPipe,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserForm {
  private fb = inject(FormBuilder);
  formUtils = FormUtils;

  userForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, this.formUtils.noWhiteSpace]],
    firstname: ['', [Validators.required, this.formUtils.noWhiteSpace]],
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

  onSave() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const newUser = this.userForm.value;
    console.log(newUser);

    this.userForm.reset();
  }
}
