import { IContactDataReducerState, IGENERATE_PRESUBMIT_ORDER } from './types';
import { IDbOrder } from '../ordersReducer/types';

export function generateOrder(
  customer: IContactDataReducerState['customer'],
  payload: IGENERATE_PRESUBMIT_ORDER['payload'],
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
  } = customer;
  const { ingredients, totalPrice } = payload;
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
