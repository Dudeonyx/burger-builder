import {
  IContactDataReducerState,
  IUPDATE_CONTACT_FORM,
  IGENERATE_PRESUBMIT_ORDER,
} from './types';
import { IDbOrder } from '../ordersReducer/types';

export const updateform = (
  draft: IContactDataReducerState,
  action: IUPDATE_CONTACT_FORM,
) => {
  const { set, name, value } = action.payload;
  if (!(set in draft.customer)) {
    // tslint:disable-next-line:no-console
    console.error(`${set} not found in Form.customer`);
    return;
  }
  if (!(name in draft.customer[set])) {
    // tslint:disable-next-line:no-console
    console.error(`${name} not found in ${set}`);
    return;
  }
  (draft.customer as any)[set][name].value = value;
  if (name === 'deliveryMethod') {
    draft.customer.deliveryMethod.deliveryMethod.options.forEach(obj => {
      obj.value === value ? (obj.checked = true) : (obj.checked = false);
    });
  }
};

export function generateOrder(
  draft: IContactDataReducerState,
  action: IGENERATE_PRESUBMIT_ORDER,
) {
  const { deliveryMethod, basicInfo, address } = draft.customer;
  const { ingredients, totalPrice } = action.payload;
  const order: IDbOrder = {
    basicInfo: {
      name: basicInfo.name.value,
      phone: basicInfo.phone.value,
      email: basicInfo.email.value,
    },
    address: {
      street: address.street.value,
      city: address.city.value,
      state: address.state.value,
      country: address.country.value,
    },
    deliveryMethod: deliveryMethod.deliveryMethod.value,
    ingredients,
    price: totalPrice,
    date: Date(),
  };
  return order;
}
