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
          return 'ERROR.MIN_LENGTH';

        case 'whiteSpace':
          return 'ERROR.WHITE_SPACE';

        case 'maxDateToday':
          return 'ERROR.MAX_DATE_TODAY';

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
      return null; // Si no hay valor, la validación pasa (usa Validators.required si es obligatorio)
    }

    const selectedDate = new Date(control.value);
    const today = new Date();

    // Normalizar ambas fechas a medianoche (00:00:00) para comparar solo año, mes y día
    selectedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (selectedDate >= today) {
      return { maxDateToday: true }; // Nombre del error devuelto
    }

    return null;
  }
}
