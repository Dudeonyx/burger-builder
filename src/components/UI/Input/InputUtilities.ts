import { IInputRules, IInputConfig } from './types';
import { isDraft } from 'immer';

export function updateCheckedFormItem(value: string, field: IInputConfig) {
  if (field.type === 'radio' || field.type === 'select') {
    if (isDraft(field)) {
      field.options.forEach(obj => {
        obj.checked = obj.value === value ? true : false;
      });
      return field;
    } else {
      const newOptions = field.options.map(obj => {
        return obj.value === value
          ? { ...obj, checked: true }
          : { ...obj, checked: false };
      });
      const newField = { ...field, options: newOptions };
      return newField;
    }
  } else {
    return field;
  }
}

export function updateFormFieldValidation(value: string, rules: IInputRules) {
  if (isDraft(rules)) {
    const valid = checkFormFieldValidity(value, rules);
    rules.valid = valid;
    rules.touched = true;
    // tslint:disable-next-line: no-console
    console.log('[updateValidation] Rules isDraft');
    return rules;
  } else if (rules) {
    const newRules = { ...rules };
    const valid = checkFormFieldValidity(value, newRules);
    newRules.valid = valid;
    newRules.touched = true;
    // tslint:disable-next-line: no-console
    console.log('[updateValidation] Rules not isDraft');
    return newRules;
  } else {
    return rules;
  }
}

export function checkFormFieldValidity(value: string, rules: IInputRules) {
  let isValid = true;

  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  } else if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }

  return isValid;
}
