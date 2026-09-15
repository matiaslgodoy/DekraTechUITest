import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

export class FormUtils {
  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  static getTextError(errors: ValidationErrors) {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'ERROR.REQUIRED';

        case 'minlength':
          return 'ERROR.MIN_LENGTH_6';

        case 'whiteSpace':
          return 'ERROR.WHITE_SPACE';

        case 'maxDateToday':
          return 'ERROR.MAX_DATE_TODAY';

        case 'notEqual':
          return 'ERROR.NOT_EQUAL';

        case 'pattern':
          if (errors['pattern'].requiredPattern === FormUtils.emailPattern) {
            return 'ERROR.EMAIL_PARRERN';
          }

          return 'Error de patrón contra expresión regular';

        default:
          return `Error de validación no controlado ${key}`;
      }
    }

    return null;
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) return null;

    const errors = form.controls[fieldName].errors ?? {};

    return FormUtils.getTextError(errors);
  }

  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return (
      !!form.controls[fieldName].errors && form.controls[fieldName].touched
    );
  }

  static noWhiteSpace(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const isWhiteSpace = (control.value || '').trim().length == 0;
    if (isWhiteSpace) return { whiteSpace: true };

    return null;
  }

  static maxDateToday(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const selectedDate = new Date(control.value);
    const today = new Date();

    selectedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (selectedDate >= today) {
      return { maxDateToday: true };
    }

    return null;
  }

  static isFieldOneEqualsFieldTwo(
    field1: string,
    field2: string,
  ): ValidationErrors | null {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const field1Control = formGroup.get(field1);
      const field2Control = formGroup.get(field2);

      if (!field1Control || !field2Control) {
        return null;
      }

      if (field1Control.value !== field2Control.value) {
        field2Control.setErrors({ ...field2Control.errors, notEqual: true });
        return { notEqual: true };
      }

      return null;
    };
  }
}
