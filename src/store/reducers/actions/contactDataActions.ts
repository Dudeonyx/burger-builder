import { Dispatch } from 'redux';
import { Iingredients } from '../../../types/ingredients';
import { actionTypes } from './index';
import axios from '../../../axios-orders';
import { IActions } from './types';
import { StoreState } from '../../types';
import { IDbOrder } from '../ordersReducer/types';
import { generateOrder } from '../contactDataReducer/utilities';
import { IContactDataState } from '../../../containers/Checkout/ContactData/types';
export const orderSuccessful = (name: string, order: IDbOrder): IActions => {
  return {
    type: actionTypes.ORDER_SUCCESSFUL,
    payload: {
      name,
      order,
    },
  };
};
export const orderFailed = (error: Error | false): IActions => {
  return {
    type: actionTypes.ORDER_FAILED,
    payload: {
      error,
    },
  };
};
export const setOrderSubmitting = (): IActions => {
  return {
    type: actionTypes.SET_ORDER_SUBMITTING,
  };
};
export const submitOrder = (
  customer: IContactDataState['customer'],
  ingredients: Iingredients,
  totalPrice: string,
): Promise<VoidFunction> => {
  return (async (dispatch: Dispatch<IActions>) => {
    try {
      const order = generateOrder(customer, ingredients, totalPrice);
      dispatch(setOrderSubmitting());
      if (!order) {
        throw new Error(
          'An error occurred while generating your order, pls try again',
        );
      }
      const response = await axios.post('/orders.json', order);
      const {
        data: { name },
      } = response;
      dispatch(orderSuccessful(name, order));
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.error('[submitOrder Action Error]', error);
      dispatch(orderFailed(error));
    }
  }) as any;
};
