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
export const setFormattedOrders = (
  formattedOrders: IformattedOrder[],
): IordersReducerAction => {
  return {
    type: actionTypes.SET_FORMATTEDORDERS,
    payload: {
      formattedOrders,
    },
  };
};
export const fetchOrders = () => {
  return async (dispatch: Dispatch<IordersReducerAction>) => {
    try {
      type T = string;
      dispatch(setOrdersLoading());
      const response = await axios.get<IDbOrders>('/orders.json');
      const { data } = response;
      dispatch(setOrders(data));
    } catch (error) {
      // tslint:disable-next-line: no-console
      console.error(error);
    }
  };
};
