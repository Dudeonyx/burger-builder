import { Dispatch } from 'redux';
import { Iingredients } from '../../types/ingredients';
import axios from '../../axios-orders';
import { generateOrder } from '../reducers/contactDataReducer/utilities';
import { ContactDataState } from '../../containers/Checkout/ContactData/types';
import { contactDataActions } from '../reducers/contactDataReducer/contactDataReducer';

const { burgerOrderFailed, burgerOrderSuccessful, setBurgerOrderSubmitting } = contactDataActions;

export const submitBurgerOrder = (
  customer: ContactDataState['customer'],
  ingredients: Iingredients,
  totalPrice: string,
  token: string | null,
  userId: string | null,
): Promise<VoidFunction> => {
  return (async (dispatch: Dispatch) => {
    try {
      const order = generateOrder(customer, ingredients, totalPrice, userId || '');
      dispatch(setBurgerOrderSubmitting());
      if (!order) {
        throw new Error('An error occurred while generating your order, pls try again');
      }
      const response = await axios.post(
        '/orders.json' + (token != null ? '?auth=' + token : ''),
        order,
      );
      const {
        data: { name },
      } = response;
      dispatch(burgerOrderSuccessful({ name, order }));
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.error('[submitBurgerOrder Action Error]', error);
      dispatch(burgerOrderFailed(error));
    }
  }) as any;
};
