import { Dispatch } from 'redux';
import { Iingredients } from '../../../types/ingredients';
import { actionTypes } from './index';
import axios from '../../../axios-orders';
import { IActions } from './types';
import { IDbOrder } from '../ordersReducer/types';
import { generateOrder } from '../contactDataReducer/utilities';
import { IContactDataState } from '../../../containers/Checkout/ContactData/types';
export const burgerOrderSuccessful = (
  name: string,
  order: IDbOrder,
): IActions => {
  return {
    type: actionTypes.BURGER_ORDER_SUCCESSFUL,
    payload: {
      name,
      order,
    },
  };
};
export const burgerOrderFailed = (error: Error | false): IActions => {
  return {
    type: actionTypes.BURGER_ORDER_FAILED,
    payload: {
      error,
    },
  };
};
export const setBurgerOrderSubmitting = (): IActions => {
  return {
    type: actionTypes.SET_BURGER_ORDER_SUBMITTING,
  };
};
export const submitBurgerOrder = (
  customer: IContactDataState['customer'],
  ingredients: Iingredients,
  totalPrice: string,
  token: string | null,
): Promise<VoidFunction> => {
  return (async (dispatch: Dispatch<IActions>) => {
    try {
      const order = generateOrder(customer, ingredients, totalPrice);
      dispatch(setBurgerOrderSubmitting());
      if (!order) {
        throw new Error(
          'An error occurred while generating your order, pls try again',
        );
      }
      const response = await axios.post(
        '/orders.json' + (token ? '?auth=' + token : ''),
        order,
      );
      const {
        data: { name },
      } = response;
      dispatch(burgerOrderSuccessful(name, order));
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.error('[submitOrder Action Error]', error);
      dispatch(burgerOrderFailed(error));
    }
  }) as any;
};
