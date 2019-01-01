import { Dispatch } from 'redux';
import { actionTypes } from './index';
import axios from '../../../axios-orders';
import { IDbOrders } from '../ordersReducer/types';
import { ordersActions } from '../ordersReducer/ordersReducer';

const { setOrders, setOrdersError, setOrdersLoading } = ordersActions;

export const fetchOrders = (token: string | null) => {
  return async (dispatch: Dispatch) => {
    try {
      type T = string;
      dispatch(setOrdersLoading());
      const response = await axios.get<IDbOrders>(
        '/orders.json' + (token != null ? '?auth=' + token : ''),
      );
      const { data } = response;
      dispatch(setOrders(data));
    } catch (error) {
      dispatch(setOrdersError(error));
      // tslint:disable-next-line: no-console
      console.error('[fetchOrders Action Error]', error);
    }
  };
};
