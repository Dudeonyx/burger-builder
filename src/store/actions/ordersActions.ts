import { Dispatch } from 'redux';
import axios from '../../axios-orders';
import { IDbOrders } from '../reducers/ordersReducer/types';
import { ordersActions } from '../reducers/ordersReducer/ordersReducer';

const { setOrders, setOrdersError, setOrdersLoading } = ordersActions;

export const fetchOrders = (token: string | null, userId: string | null) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setOrdersLoading());
      const queryParams =
        token != null && userId != null
          ? `?auth=${token}&orderBy="userId"&equalTo="${userId}"`
          : '';
      const response = await axios.get<IDbOrders>('/orders.json' + queryParams);
      const { data } = response;
      dispatch(setOrders(data));
    } catch (error) {
      dispatch(setOrdersError(error));
      // tslint:disable-next-line: no-console
      console.error('[fetchOrders Action Error]', error);
    }
  };
};
