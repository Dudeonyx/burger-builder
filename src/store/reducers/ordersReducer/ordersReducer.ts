import { IordersReducerState, IordersReducerAction } from './types';
import produce from 'immer';
import { actionTypes } from '../actions';

const initialState: IordersReducerState = {
  orders: null,
  loading: false,
  error: null,
};

export const ordersReducer = produce((draft, action: IordersReducerAction) => {
  switch (action.type) {
    case actionTypes.SET_ORDERS_ERROR:
      draft.error = action.payload.error;
      draft.loading = false;
      break;
    case actionTypes.SET_ORDERS_LOADING:
      draft.loading = true;
      draft.error = null;
      break;
    case actionTypes.SET_ORDERS:
      // draft.orders = action.payload.orders;
      draft.error = null;
      draft.orders = action.payload.orders;
      draft.loading = false;
      break;
    default:
      const _: never = action;
      break;
  }
}, initialState);
