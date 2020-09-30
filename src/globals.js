import { DefaultValidator } from '@ultritium/validate';
import { isUndefined } from 'lodash';

let validator;

export function getValidator() {
  if (isUndefined(validator)) {
    validator = DefaultValidator();
    const validationProvider = validator.getProvider('validation');
    validationProvider.addValidation('isSameEmail', (value, compare) => value === compare);

    const messageProvider = validator.getProvider('message');
    messageProvider.addMessage('required', 'Validations.Required');
    messageProvider.addMessage('isInt', 'Validations.IsInt');
    messageProvider.addMessage('isEmail', 'Validations.IsEmail');
    messageProvider.addMessage('isSameEmail', 'Validations.IsSameEmail');
  }

  return validator;
}
