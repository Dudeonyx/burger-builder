import { IDbOrders, IDbOrder } from '../../ordersReducer/types';
import { actionTypes } from '../../actions';

// tslint:disable-next-line:no-empty-interface
export interface IContactDataReducerState {
  error: Error | false;
  submitting: boolean;
  orders: IDbOrders;
}

export interface IORDER_SUCCESSFUL {
  type: typeof actionTypes.BURGER_ORDER_SUCCESSFUL;
  payload: {
    name: string;
    order: IDbOrder;
  };
}
export interface IORDER_FAILED {
  type: typeof actionTypes.BURGER_ORDER_FAILED;
  payload: {
    error: Error | false;
  };
}
export interface ISET_ORDER_SUBMITTING {
  type: typeof actionTypes.SET_BURGER_ORDER_SUBMITTING;
}

export type IContactDataReducerActions =
  | IORDER_SUCCESSFUL
  | IORDER_FAILED
  | ISET_ORDER_SUBMITTING;
