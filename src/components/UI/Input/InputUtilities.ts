import { IInputRules, IInputConfig, IInputRadioConfig } from './types';
import { ChangeEvent } from 'react';
import { verifyObjKey } from '../../../shared/verifyObjKey';
import { Draft } from 'immer';

export function updateFormImmutably<F extends { [x: string]: IInputConfig }>(
  form: F,
  name: keyof F,
  value: string,
) {
  // const { name, value } = event.target;
  if (!verifyObjKey(form, name)) {
    // tslint:disable-next-line:no-console
    console.error(`${name} not found in Form`);
    return form;
  }
  const field: IInputConfig = { ...form[name] };
  const validation = updateFormFieldValidationImmutably(field.validation, value);
  if (field.type === 'radio') {
    const options = updateCheckedFormItemImmutably(field.options, value);
    const newForm = {
      ...form,
      [name]: { ...field, value, validation, options },
    };
    return newForm;
  } else {
    const newForm = {
      ...form,
      [name]: { ...field, value, validation },
    };
    return newForm;
  }
}
export function updateInputFieldImmutably(field: IInputConfig, value: string) {
  const validation = updateFormFieldValidationImmutably(field.validation, value);
  if (field.type === 'radio') {
    const options = updateCheckedFormItemImmutably(field.options, value);
    const newField = { ...field, value, validation, options };
    return newField;
  } else {
    const newField = { ...field, value, validation };
    return newField;
  }
}

export function updateFormDraft<F extends { [x: string]: IInputConfig }>(
  form: Draft<F>,
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
  options: Readonly<IInputRadioConfig['options']>,
  value: string,
) {
  return options.map(obj => {
    return obj.value === value ? { ...obj, checked: true } : { ...obj, checked: false };
  });
}

function updateCheckedFormItemDraft(field: Draft<IInputConfig>, value: string) {
  if (field.type === 'radio') {
    field.options.forEach(obj => {
      obj.checked = obj.value === value ? true : false;
    });
    return field;
  }
  return field;
}

function updateFormFieldValidationImmutably(rules: Readonly<IInputRules>, value: string) {
  const valid = checkFormFieldValidity(rules, value);
  const newRules = { ...rules, valid, touched: true };
  // tslint:disable-next-line: no-console
  // console.log('[updateValidation] Rules not isDraft');
  return newRules;
}

function updateFormFieldValidationDraft(rules: Draft<IInputRules>, value: string) {
  const valid = checkFormFieldValidity(rules, value);
  rules.valid = valid;
  rules.touched = true;
  // tslint:disable-next-line: no-console
  // console.log('[updateValidation] Rules isDraft');
  return rules;
}

export function checkFormFieldValidity(rules: Readonly<IInputRules>, value: string) {
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
