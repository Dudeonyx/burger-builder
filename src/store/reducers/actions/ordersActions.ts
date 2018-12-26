import { Dispatch } from 'redux';
import { actionTypes } from './index';
import axios from '../../../axios-orders';
import {
  IordersReducerAction,
  IDbOrders,
  IformattedOrder,
} from '../ordersReducer/types';
export const setOrders = (orders: IDbOrders): IordersReducerAction => {
  return {
    type: actionTypes.SET_ORDERS,
    payload: {
      orders,
    },
  };
};
export const setOrdersLoading = (): IordersReducerAction => {
  return {
    type: actionTypes.SET_ORDERS_LOADING,
  };
};
export const setOrdersError = (error: Error): IordersReducerAction => {
  return {
    type: actionTypes.SET_ORDERS_ERROR,
    payload: { error },
  };
};

export const fetchOrders = (token: string | null) => {
  return async (dispatch: Dispatch<IordersReducerAction>) => {
    try {
      type T = string;
      dispatch(setOrdersLoading());
      const response = await axios.get<IDbOrders>(
        '/orders.json' + (token ? '?auth=' + token : ''),
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
