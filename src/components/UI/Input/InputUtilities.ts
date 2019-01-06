import { IInputRules, IInputConfig } from './types';
import { ChangeEvent } from 'react';
import { verifyObjKey } from '../../../shared/verifyObjKey';

export function updateFormImmutably<F extends { [x: string]: IInputConfig }>(
  form: F,
  { target: { name, value } }: ChangeEvent<HTMLInputElement>,
) {
  // const { name, value } = event.target;
  if (!verifyObjKey(form, name)) {
    // tslint:disable-next-line:no-console
    console.error(`${name} not found in Form`);
    return form;
  }
  const field = { ...form[name] };
  const validation = updateFormFieldValidationImmutably(
    field.validation,
    value,
  );
  const newField = updateCheckedFormItemImmutably(field, value);
  const newForm = {
    ...form,
    [name]: { ...newField, value, validation },
  };
  return newForm;
}

export function updateFormDraft<F extends { [x: string]: IInputConfig }>(
  form: F,
  { target: { name, value } }: ChangeEvent<HTMLInputElement>,
) {
  // const { name, value } = event.target;
  if (!verifyObjKey(form, name)) {
    // tslint:disable-next-line:no-console
    console.error(`${name} not found in Form`);
    return form;
  }
  const field = form[name];
  field.value = value;
  updateFormFieldValidationDraft(field.validation, value);
  updateCheckedFormItemDraft(field, value);
  return form;
}

function updateCheckedFormItemImmutably(
  field: Readonly<IInputConfig>,
  value: string,
) {
  if (field.type === 'radio') {
    const newOptions = field.options.map(obj => {
      return obj.value === value
        ? { ...obj, checked: true }
        : { ...obj, checked: false };
    });
    const newField = { ...field, options: newOptions };
    return newField;
  }
  const cpField = { ...field };
  return cpField;
}

function updateCheckedFormItemDraft(field: IInputConfig, value: string) {
  if (field.type === 'radio') {
    field.options.forEach(obj => {
      obj.checked = obj.value === value ? true : false;
    });
    return field;
  }
  return field;
}

function updateFormFieldValidationImmutably(
  rules: Readonly<IInputRules>,
  value: string,
) {
  const newRules = { ...rules };
  const valid = checkFormFieldValidity(newRules, value);
  newRules.valid = valid;
  newRules.touched = true;
  // tslint:disable-next-line: no-console
  // console.log('[updateValidation] Rules not isDraft');
  return newRules;
}

function updateFormFieldValidationDraft(rules: IInputRules, value: string) {
  const valid = checkFormFieldValidity(rules, value);
  rules.valid = valid;
  rules.touched = true;
  // tslint:disable-next-line: no-console
  // console.log('[updateValidation] Rules isDraft');
  return rules;
}

export function checkFormFieldValidity(
  rules: Readonly<IInputRules>,
  value: string,
) {
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
