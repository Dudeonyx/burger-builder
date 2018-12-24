import { IActionTypes } from '../../actions/types';
import { IDbOrders, IDbOrder } from '../../ordersReducer/types';
import { Iingredients } from '../../../../types/ingredients';
import { IInputConfig } from '../../../../components/UI/Input/types';

// tslint:disable-next-line:no-empty-interface
export interface IContactDataReducerState {
  customer: {
    name: IInputConfig;
    phone: IInputConfig;
    email: IInputConfig;
    street: IInputConfig;
    city: IInputConfig;
    state: IInputConfig;
    country: IInputConfig;
    deliveryMethod: {
      value: string;
      options: IInputConfig[];
    };
  };
  presubmitOrder: IDbOrder | null;
  orders: IDbOrders;
  error: Error | false;
  submitting: boolean;
}
type CustomerKeys = keyof IContactDataReducerState['customer'];

export interface IUPDATE_CONTACT_FORM {
  type: IActionTypes['UPDATE_CONTACT_FORM'];
  payload: {
    value: string;
    name: CustomerKeys;
  };
}

export interface IRESET_CONTACT_FORM {
  type: IActionTypes['RESET_CONTACT_FORM'];
}

export interface IORDER_SUCCESSFUL {
  type: IActionTypes['ORDER_SUCCESSFUL'];
  payload: {
    name: string;
    order: IDbOrder;
  };
}
export interface IORDER_FAILED {
  type: IActionTypes['ORDER_FAILED'];
  payload: {
    error: Error | false;
  };
}
export interface ISET_ORDER_SUBMITTING {
  type: IActionTypes['SET_ORDER_SUBMITTING'];
}
export interface IGENERATE_PRESUBMIT_ORDER {
  type: IActionTypes['GENERATE_PRESUBMIT_ORDER'];
  payload: {
    ingredients: Iingredients;
    totalPrice: string;
  };
}
export type IContactDataReducerActions =
  | IUPDATE_CONTACT_FORM
  | IRESET_CONTACT_FORM
  | IORDER_SUCCESSFUL
  | IORDER_FAILED
  | ISET_ORDER_SUBMITTING
  | IGENERATE_PRESUBMIT_ORDER;
