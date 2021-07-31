import { InputRules, InputConfig, InputRadioConfig } from "./types";
import { verifyObjKey } from "../../../shared/verifyObjKey";

export function checkFormFieldValidity(
  rules: Readonly<InputRules>,
  value: string
) {
  let isValid = true;

  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.isEmail) {
    const pattern =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  } else if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }

  return isValid;
}

function updateCheckedFormItemImmutably(
  options: Readonly<InputRadioConfig["options"]>,
  value: string
) {
  return options.map((obj) => {
    return obj.value === value
      ? { ...obj, checked: true }
      : { ...obj, checked: false };
  });
}

function updateFormFieldValidationImmutably(
  rules: Readonly<InputRules>,
  value: string
) {
  const valid = checkFormFieldValidity(rules, value);
  const newRules = { ...rules, valid, touched: true };
  // tslint:disable-next-line: no-console
  // console.log('[updateValidation] Rules not isDraft');
  return newRules;
}
export function updateFormImmutably<
  F extends { [x: string]: InputConfig },
  N extends keyof F
>(form: F, name: N, value: string) {
  // const { name, value } = event.target;
  if (!verifyObjKey(form, name)) {
    console.error(`${name} not found in Form`);
    return form;
  }
  const field: InputConfig = { ...form[name] };
  const validation = updateFormFieldValidationImmutably(
    field.validation,
    value
  );
  if (field.type === "radio") {
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
export function updateInputFieldImmutably(field: InputConfig, value: string) {
  const validation = updateFormFieldValidationImmutably(
    field.validation,
    value
  );
  if (field.type === "radio") {
    const options = updateCheckedFormItemImmutably(field.options, value);
    const newField = { ...field, value, validation, options };
    return newField;
  } else {
    const newField = { ...field, value, validation };
    return newField;
  }
}