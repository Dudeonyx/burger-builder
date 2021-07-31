import { IDbOrder } from '../ordersReducer/types';
import { ContactDataState } from '../../../containers/Checkout/ContactData/types';
import { Iingredients } from '../../../types/ingredients';

export function generateOrder(
  customer: ContactDataState['customer'],
  ingredients: Iingredients,
  totalPrice: string,
  userId: string,
) {
  const { deliveryMethod, name, city, country, email, phone, state, street } = customer;
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
    userId,
    price: totalPrice,
    date: Date(),
  };
  return order;
}
