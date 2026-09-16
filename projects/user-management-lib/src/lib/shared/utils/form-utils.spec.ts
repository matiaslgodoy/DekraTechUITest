import { FormControl, FormGroup } from '@angular/forms';
import { FormUtils } from './form-utils';

describe('FormUtils', () => {
  describe('isFieldOneEqualsFieldTwo', () => {
    it('should return null if one of the controls does not exist', () => {
      const form = new FormGroup({ pass: new FormControl('123456') });
      const validator = FormUtils.isFieldOneEqualsFieldTwo(
        'pass',
        'confirmPass',
      );

      // Invocación segura usando ?.
      expect(validator?.(form)).toBeNull();
    });

    it('should set error on field2 and return { notEqual: true } when values do not match', () => {
      const passControl = new FormControl('123456');
      const confirmPassControl = new FormControl('654321');
      const form = new FormGroup({
        pass: passControl,
        confirmPass: confirmPassControl,
      });

      const validator = FormUtils.isFieldOneEqualsFieldTwo(
        'pass',
        'confirmPass',
      );

      // Invocación segura
      const result = validator?.(form);

      expect(result).toEqual({ notEqual: true });
      expect(confirmPassControl.hasError('notEqual')).toBeTrue();
    });

    it('should return null when both field values match', () => {
      const passControl = new FormControl('123456');
      const confirmPassControl = new FormControl('123456');
      const form = new FormGroup({
        pass: passControl,
        confirmPass: confirmPassControl,
      });

      const validator = FormUtils.isFieldOneEqualsFieldTwo(
        'pass',
        'confirmPass',
      );

      // Invocación segura
      expect(validator?.(form)).toBeNull();
    });
  });
});
