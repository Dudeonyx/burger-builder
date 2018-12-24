import {
  IContactDataReducerState,
  IUPDATE_CONTACT_FORM,
  IGENERATE_PRESUBMIT_ORDER,
} from './types';
import { IDbOrder } from '../ordersReducer/types';
import { IInputRules } from '../../../components/UI/Input/types';
import { checkValidity } from '../../../components/UI/Input/checkInputValidity';

export const updateform = (
  draft: IContactDataReducerState,
  action: IUPDATE_CONTACT_FORM,
) => {
  const { name, value } = action.payload;

  if (!(name in draft.customer)) {
    // tslint:disable-next-line:no-console
    console.error(`${name} not found in Form`);
    return;
  }
  draft.customer[name].value = value;
  if (name !== 'deliveryMethod' && draft.customer[name].validation) {
    const valid = checkValidity(value, draft.customer[name].validation);
    draft.customer[name].validation!.valid = valid;
    draft.customer[name].validation!.touched = true;
  } else if (name === 'deliveryMethod') {
    draft.customer.deliveryMethod.options.forEach(obj => {
      obj.value === value ? (obj.checked = true) : (obj.checked = false);
    });
  }
};

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
