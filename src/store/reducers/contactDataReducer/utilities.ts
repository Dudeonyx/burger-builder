import {
  IContactDataReducerState,
  IUPDATE_CONTACT_FORM,
  IGENERATE_PRESUBMIT_ORDER,
} from './types';
import { IDbOrder } from '../ordersReducer/types';
import {
  updateFormFieldValidation,
  updateCheckedFormItem,
} from '../../../components/UI/Input/InputUtilities';
import { isDraft } from 'immer';

export function updateform(
  draft: IContactDataReducerState,
  action: IUPDATE_CONTACT_FORM,
) {
  if (!isDraft(draft)) {
    // tslint:disable-next-line:no-console
    console.error(
      `updateForm function can only be used with drafts produced by 'immer'`,
    );
    return draft;
  }
  const { name, value } = action.payload;
  if (!(name in draft.customer)) {
    // tslint:disable-next-line:no-console
    console.error(`${name} not found in Form`);
    return;
  }
  const field = draft.customer[name];
  field.value = value;
  updateFormFieldValidation(value, field.validation);
  updateCheckedFormItem(value, field);
}

export function generateOrder(
  draft: IContactDataReducerState,
  action: IGENERATE_PRESUBMIT_ORDER,
) {
  const {
    deliveryMethod,
    name,
    city,
    country,
    email,
    phone,
    state,
    street,
  } = draft.customer;
  const { ingredients, totalPrice } = action.payload;
  const order: IDbOrder = {
    basicInfo: {
      name: name.value,
      phone: phone.value,
      email: email.value,
    },
    address: {
      street: street.value,
      city: city.value,
      state: state.value,
      country: country.value,
    },
    deliveryMethod: deliveryMethod.value,
    ingredients,
    price: totalPrice,
    date: Date(),
  };
  return order;
}
