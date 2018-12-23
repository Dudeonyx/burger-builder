import { formatOrders } from './utilities';
import {
  IordersReducerState,
  IordersReducerAction,
  IformattedOrder,
  IDbOrders,
  ISET_ORDERS,
} from './types';
import produce from 'immer';
import { actionTypes } from '../actions';

const initialState: IordersReducerState = {
  orders: null,
  loading: false,
  formattedOrders: [],
};

export const ordersReducer = (
  state = initialState,
  action: IordersReducerAction,
) => {
  return produce(state, draft => {
    switch (action.type) {
      case actionTypes.SET_FORMATTEDORDERS:
        draft.formattedOrders = action.payload.formattedOrders;
        draft.loading = false;
        break;
      case actionTypes.SET_ORDERS_LOADING:
        draft.loading = true;
        break;
      case actionTypes.SET_ORDERS:
        // draft.orders = action.payload.orders;
        const formattedOrders = formatOrders(action);
        draft.formattedOrders = formattedOrders;
        draft.loading = false;
        break;
      default:
        break;
    }
  });
};
