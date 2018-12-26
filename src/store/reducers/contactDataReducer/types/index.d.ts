import { IDbOrders, IDbOrder } from '../../ordersReducer/types';
import { Iingredients } from '../../../../types/ingredients';
import { IInputConfig } from '../../../../components/UI/Input/types';
import { actionTypes } from '../../actions';
import { ChangeEvent } from 'react';
import { IContactDataState } from '../../../../containers/Checkout/ContactData/types';

// tslint:disable-next-line:no-empty-interface
export interface IContactDataReducerState {
  error: Error | false;
  submitting: boolean;
  orders: IDbOrders;
}

export interface IORDER_SUCCESSFUL {
  type: typeof actionTypes.ORDER_SUCCESSFUL;
  payload: {
    name: string;
    order: IDbOrder;
  };
}
export interface IORDER_FAILED {
  type: typeof actionTypes.ORDER_FAILED;
  payload: {
    error: Error | false;
  };
}
export interface ISET_ORDER_SUBMITTING {
  type: typeof actionTypes.SET_ORDER_SUBMITTING;
}

export type IContactDataReducerActions =
  | IORDER_SUCCESSFUL
  | IORDER_FAILED
  | ISET_ORDER_SUBMITTING;
